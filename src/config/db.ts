import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelizeInstance = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: true,
        timezone: '+00:00'
    }
);

export default sequelizeInstance;