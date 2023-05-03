import {Router} from "express";
import userRouter from "./user.routes";
import archiveRouter from "./archive.routes";

const routes = Router();

routes.use('/users', userRouter);
routes.use('/archive', archiveRouter)

export default routes;