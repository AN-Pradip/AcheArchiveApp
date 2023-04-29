import { Router, Request, Response }  from "express";
import pool from "../config/database.connection"
import bcrypt from "bcrypt"
import generateToken from "../config/token.generate"

const saltround = 10;
const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) => {
    return res.send("running on users base path");
})

userRouter.post('/login', (req: Request, res: Response) => {
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
    
        pool.query(`SELECT Password FROM User WHERE FName = '${req.body.FName}'`, (err: any, row: any) => {
            //If first name is not in user table
            if(err){
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400,
                    error: err,
                    message: "User doesn't exist"
                })
            }
            console.log(row[0].Password)
            const hashedPwd = row[0].Password;
            bcrypt.compare(req.body.Password, hashedPwd, (err: any, result: any) => {
                //If error when comparing
                if(err){
                    conn.release();
                    return res.send({
                        success: false,
                        statusCode: 500,
                        error: err,
                        message: "Compare error"
                    })
                }
                if(result) {
                    res.send({
                        success: result,
                        statusCode: 200,
                        message: "Right password",
                        data: {token: generateToken(req.body.FName)}
                    })
                } else{
                    conn.release();
                    return res.send({
                        success: result,
                        statusCode: 401,
                        error: err,
                        message: "Wrong Password"
                    })
                }
                conn.release();
            })
        })
    })
})

export default userRouter