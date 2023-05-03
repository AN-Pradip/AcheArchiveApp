import { Router, Request, Response }  from "express";
import pool from "../config/database.connection"
import authenticate from "../config/token.authentification";

const archiveRouter = Router();

archiveRouter.get('/your-archive', authenticate, (req: Request, res: Response) => {
    pool.getConnection( (err: any, conn: any) => {
        //If connection error
        if (err){
            console.log(err)
            res.send({
                success: false,
                statusCode: 500
            })
            return
        }
        pool.query(`SELECT * FROM Pain WHERE User_idUser = '${req.body.Userid}'`, (err: any, table: any) => {
            if(err){
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400,
                    error: err,
                    message: "User doesn't have an archive"
                })
            } 
            res.send({
                message: 'Success',
                statusCode: 200,
                data: table
            });
            console.log(table)
            conn.release();
        })
    })
})

archiveRouter.get('/your-archive/:id', authenticate, (req: Request, res: Response) => {
    pool.getConnection( (err: any, conn: any) => {
        //If connection error
        if (err){
            console.log(err)
            res.send({
                success: false,
                statusCode: 500
            })
            return
        }
        pool.query(`SELECT * FROM Pain WHERE User_idUser = '${req.body.Userid}' AND idPain=?`, [req.params.id] , (err: any, table: any) => {
            if(err){
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400,
                    error: err,
                    message: "User doesn't have an archive"
                })
            } 
            res.send({
                message: 'Success',
                statusCode: 200,
                data: table
            });
            console.log(table)
            conn.release();
        })
    })
})

export default archiveRouter
//INSERT INTO Pain (User_idUser, PainDateTime, PainLength, PainLvl, PainInformation, PainfulBurning, PainfulCold, PainfulElectricShock, PainTingling, PainPinsAndNeedles, PainNumbness, PainItching, PainHypoesthesiaTouch, PainHypoesthesiaPinPrick, PainBrushing) VALUES ('${req.body.idUser}', '', '')