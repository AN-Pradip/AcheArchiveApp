import express, { Request, Response }  from "express";
import dotenv from "dotenv";
import routes from "./routes"

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);

app.listen(process.env.LOCAL_PORT, () => {
    console.log(`listening on port ${process.env.LOCAL_PORT} `)
})


