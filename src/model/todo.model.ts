import { Sequelize, Model, DataTypes } from "sequelize";
import sequelizeInstance from "../config/db";

class Todo extends Model {
    public id!: string;
    public user_id!: number;
    public title!: string;
    public description!: string;
    public status!: 'pending' | 'completed';
    public due_date!: Date | null;
    public created_at!: Date;
    public updated_at!: Date;
}

Todo.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(225),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed'),
            defaultValue: 'pending',
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: Sequelize.fn('NOW'),
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: 'Todo',
        tableName: 'todos',
        timestamps: false,
    }
);

export default Todo