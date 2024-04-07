import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{4,20}$/;

export class SignInDto  {


  @IsNotEmpty({ message: 'Email is required.' }) // Validation error message for empty email
    @IsEmail({ allow_display_name: true, require_tld: true }, { message: 'Please provide valid Email.' })
    email: string| null;

    @IsNotEmpty({ message: 'password is required.' }) // Validation error message for empty password
    /* @Matches(passwordRegEx, {
      message: `Password must contain Minimum 4 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
    }) */
    password: string|null;
}
