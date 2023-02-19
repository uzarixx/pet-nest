import {IsNumber, IsString} from "class-validator";

export class TaskValueDto {
    @IsNumber()
    readonly taskId: number;
    @IsString({message: 'value is not a string'})
    readonly taskValue: string;
}