"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_connection_1 = __importDefault(require("../config/database.connection"));
const token_authentification_1 = __importDefault(require("../config/token.authentification"));
const archiveRouter = (0, express_1.Router)();
archiveRouter.get('/your-archive', token_authentification_1.default, (req, res) => {
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
        database_connection_1.default.query(`SELECT * FROM Pain WHERE User_idUser = '${req.body.Userid}'`, (err, table) => {
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400,
                    error: err,
                    message: "User doesn't have an archive"
                });
            }
            res.send({
                message: 'Success',
                statusCode: 200,
                data: table
            });
            console.log(table);
            conn.release();
        });
    });
});
exports.default = archiveRouter;
//INSERT INTO Pain (User_idUser, PainDateTime, PainLength, PainLvl, PainInformation, PainfulBurning, PainfulCold, PainfulElectricShock, PainTingling, PainPinsAndNeedles, PainNumbness, PainItching, PainHypoesthesiaTouch, PainHypoesthesiaPinPrick, PainBrushing) VALUES ('${req.body.idUser}', '', '')
