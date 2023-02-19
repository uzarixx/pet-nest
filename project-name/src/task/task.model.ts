import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "src/users/users.model";
import {TaskList} from "./taskList.model";


interface TaskCreationAttrs {
    taskValue: string;
    taskId: number;
    userId: number;
}


@Table({tableName: 'task'})
export class Task extends Model<Task, TaskCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    taskValue: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isDone: boolean;

    @ForeignKey(() => TaskList)
    @Column({type: DataType.INTEGER})
    taskId: number;

    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => TaskList)
    taskList: TaskList[]

}