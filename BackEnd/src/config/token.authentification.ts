import { Request, Response, NextFunction }  from "express";
import jwt from "jsonwebtoken"

const authenticate: any = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if(!token){
        res.send({
            success: false,
            statusCode: 401,
            message: "no or invalid token"
        })
    } else {
        const tokenSecret = "my-token-secret";
        //token on 1 position /  bearer on position 0
        jwt.verify(token.split(' ')[1], tokenSecret, (err: any, value: any) => {
            if(err){
                res.send({
                    success: false,
                    statusCode: 401,
                    message: "invalid token"
                })
            } else {
                (<any>req).user = value.data;
                console.log((<any>req).user)
                next()
            }
        })
    }
}

export default authenticate