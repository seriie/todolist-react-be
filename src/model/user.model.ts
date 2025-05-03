import { Sequelize, DataTypes, Model } from "sequelize";
import sequelizeInstance from "../config/db";

await sequelizeInstance.authenticate();

class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: 'user' | 'admin';
    public created_at!: Date;
    public updated_at!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(75),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
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
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
    }
);

export default User;