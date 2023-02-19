import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Task} from "./task.model";

interface TaskListCreationAttrs {
    name: string;
    userId: number;
}

@Table({tableName: 'task_list'})
export class TaskList extends Model<TaskList, TaskListCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.INTEGER})
    userId: number;

    @HasMany(() => Task)
    task: Task[]
}