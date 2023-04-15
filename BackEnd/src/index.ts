import express  from "express";
import { Request, Response } from "express";

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('running on base path');
});

app.listen(3000, () => {
    console.log('listening on port 3000')
})