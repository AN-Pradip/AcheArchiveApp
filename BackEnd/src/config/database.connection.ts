import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host : process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: parseInt(process.env.DATABASE_PORT || "" , 10),
    connectionLimit : 10,
    multipleStatements : true  
});

export default pool;