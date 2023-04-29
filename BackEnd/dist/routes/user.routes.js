"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_connection_1 = __importDefault(require("../config/database.connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_generate_1 = __importDefault(require("../config/token.generate"));
const saltround = 10;
const userRouter = (0, express_1.Router)();
userRouter.get('/', (req, res) => {
    return res.send("running on users base path");
});
userRouter.post('/login', (req, res) => {
    database_connection_1.default.getConnection((err, conn) => {
        //If connection error
        if (err) {
            console.log(err);
            res.send({
                success: false,
                statusCode: 500
            });
            return;
        }
        database_connection_1.default.query(`SELECT Password FROM User WHERE FName = '${req.body.FName}'`, (err, row) => {
            //If first name is not in user table
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400,
                    error: err,
                    message: "User doesn't exist"
                });
            }
            console.log(row[0].Password);
            const hashedPwd = row[0].Password;
            bcrypt_1.default.compare(req.body.Password, hashedPwd, (err, result) => {
                //If error when comparing
                if (err) {
                    conn.release();
                    return res.send({
                        success: false,
                        statusCode: 500,
                        error: err,
                        message: "Compare error"
                    });
                }
                if (result) {
                    res.send({
                        success: result,
                        statusCode: 200,
                        message: "Right password",
                        data: { token: (0, token_generate_1.default)(req.body.FName) }
                    });
                }
                else {
                    conn.release();
                    return res.send({
                        success: result,
                        statusCode: 401,
                        error: err,
                        message: "Wrong Password"
                    });
                }
                conn.release();
            });
        });
    });
});
exports.default = userRouter;
