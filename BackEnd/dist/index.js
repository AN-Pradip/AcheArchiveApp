"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('running on base path');
});
app.get('/login', (req, res) => {
    var pool = mysql_1.default.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: parseInt(process.env.DATABASE_PORT || "", 10),
        connectionLimit: 10,
        multipleStatements: true
    });
    pool.getConnection(function (err, conn) {
        //if connection error
        if (err) {
            console.log(err);
            res.send({
                success: false,
                statusCode: 500
            });
            return;
        }
        //find User table
        conn.query('SELECT * from User', function (err, table) {
            //if error in finding user table
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400,
                });
            }
            //show table
            res.send({
                statusCode: 200,
                data: table
            });
            conn.release();
        });
    });
});
app.post('/test', (req, res) => {
    res.send({
        data: req.body
    });
});
app.listen(process.env.LOCAL_PORT, () => {
    console.log(`listening on port ${process.env.LOCAL_PORT} `);
});
