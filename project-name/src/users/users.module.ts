import {forwardRef, Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from "./users.controller";
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from "./users.model";
import {Role} from 'src/roles/roles.model';
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {TaskList} from "../task/taskList.model";
import {Task} from 'src/task/task.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User, Role, UserRoles, TaskList, Task]), RolesModule, forwardRef(() => AuthModule)],
    exports: [UsersService]
})
export class UsersModule {
}
