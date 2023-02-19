import {Module} from "@nestjs/common";
import {SequelizeModule} from '@nestjs/sequelize'
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {AuthModule} from './auth/auth.module';
import {TaskModule} from './task/task.module';
import {TaskList} from "./task/taskList.model";
import {Task} from "./task/task.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.development.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, TaskList, Task],
            autoLoadModels: true,
            logging: false
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        TaskModule,
    ],
})
export class AppModule {
}