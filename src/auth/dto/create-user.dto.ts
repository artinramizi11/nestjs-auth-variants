import { IsString } from "class-validator";

export class CreateUserDto {
@IsString()
email: String 

@IsString()
password: String
}