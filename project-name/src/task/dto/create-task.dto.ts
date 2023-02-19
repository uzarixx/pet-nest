import {IsString, Length} from "class-validator";

export class CreateTaskDto {
    @IsString({message: 'Is not a string'})
    @Length(4, 16, {message: 'min length 4 and max 16'})
    readonly name: string;
}