import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@gmail.com', description: 'e-mail'})
    @IsString({message: 'Is not a string'})
    @IsEmail({}, {message: 'is not a email'})
    readonly email: string;

    @ApiProperty({example: 'password', description: 'user password'})
    @IsString({message: 'Is not a string'})
    @Length(4, 16, {message: 'min length 4 and max 16'})
    readonly password: string;
}