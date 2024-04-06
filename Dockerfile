# syntax=docker/dockerfile:1

# Use node image for base image for all stages.
FROM node:20.9.0-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Create a stage for installing production dependencies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Create a stage for building the application.
FROM deps as build

# Switch to a non-root user
USER node

# Change ownership of the node_modules directory to the non-root user node
RUN chown -R node:node /usr/src/app/node_modules

# Dynamically determine the owner of the node_modules directory and switch to that user
RUN owner=$(stat -c '%U' /usr/src/app/node_modules) && \
    chown $owner /usr/src/app/node_modules

# Give the user permissions over all files within the node_modules directory
RUN chmod -R u+w /usr/src/app/node_modules

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .

# Run the build script.
RUN npm run build

# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Use production node environment by default.
ENV NODE_ENV development

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Run npm install to install dependencies
RUN npm install

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/dist ./dist

# Ensure the directory where Nest CLI is installed is in the PATH
ENV PATH="/home/node/.npm-global/bin:$PATH"
RUN ls -la /usr/src/app/node_modules
RUN stat /usr/src/app/node_modules
