import {forwardRef, Module} from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TaskList} from "./taskList.model";
import {User} from "../users/users.model";
import {Task} from "./task.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [SequelizeModule.forFeature([User, TaskList, Task]), forwardRef(() => AuthModule)],
})
export class TaskModule {}
