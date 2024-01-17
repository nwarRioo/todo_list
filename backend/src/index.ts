import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

class App {
    private app: Express;
    constructor() {
        this.app = express();
        this.app.use(cors());
    }

    public init = async (): Promise<void> => {
        try {
            this.app.get('/', (req: Request, res: Response) => {
                res.send('Hello world!')
            })
            this.app.listen(process.env.APP_PORT, () => {
                console.log("Server is running on port " + process.env.APP_PORT);
            })
        } catch (err) {
            console.log("[ERROR]: " + err);
        }
    }
}

const app = new App();
app.init();