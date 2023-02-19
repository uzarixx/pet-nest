import {Body, Controller, Delete, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {TaskService} from "./task.service";
import {RolesGuard} from "../auth/roles.guard";
import {CreateTaskDto} from "./dto/create-task.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {UserAuth} from "../auth/get-auth.decorator";
import {User} from "../users/users.model";
import {TaskValueDto} from "./dto/task-value.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {
    }

    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/create')
    create(@Body() dto: CreateTaskDto, @UserAuth() user: User) {
        return this.taskService.create(dto, user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    delete(@Body() dto: TaskValueDto, @UserAuth() user: User) {
        return this.taskService.delete(dto, user)
    }

    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/create-task')
    createTask(@Body() dto: TaskValueDto, @UserAuth() user: User) {
        return this.taskService.taskCreate(dto, user)
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get('/get-all')
    getAllTask(@UserAuth() user: User) {
        return this.taskService.getAllTask(user)
    }
}
