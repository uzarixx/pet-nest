import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {User} from "../users/users.model";
import {InjectModel} from "@nestjs/sequelize";
import {TaskList} from "./taskList.model";
import {TaskValueDto} from "./dto/task-value.dto";
import {Task} from "./task.model";

@Injectable()
export class TaskService {

    constructor(@InjectModel(TaskList) private taskListRepository: typeof TaskList, @InjectModel(Task) private taskRepository: typeof Task) {
    }

    async create(dto: CreateTaskDto, user: User) {
        const taskList = await this.taskListRepository.create({name: dto.name, userId: user.id})
        return taskList
    }

    async delete(dto: TaskValueDto, user: User) {
        const taskList = await this.taskListRepository.findOne({where: {id: dto.taskId}})
        if (taskList.userId !== user.id) {
            throw new HttpException('It\'s not your task list or this task list is not a found', HttpStatus.BAD_REQUEST)
        }
        await this.taskListRepository.destroy({where: {id: taskList.id}})
        return 'deleted'
    }

    async taskCreate(dto: TaskValueDto, user: User) {
        const taskList = await this.taskListRepository.findOne({where: {id: dto.taskId}})
        if (!taskList) {
            throw new HttpException('Task List Is Not A Found', HttpStatus.NOT_FOUND)
        }
        const task = await this.taskRepository.create({taskValue: dto.taskValue, taskId: dto.taskId, userId: user.id})
        return task;
    }

    async getAllTask(user: User) {
        const taskLists = await this.taskListRepository.findAll({where: {userId: user.id}, include: {all: true}})
        return taskLists
    }
}
