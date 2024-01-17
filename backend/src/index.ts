import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { mongoDB } from "./repository/mongoDB";
import { TasksRoute } from "./routes/tasksRoute";
dotenv.config();

class App {
    private app: Express;
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
    }

    public init = async (): Promise<void> => {
        try {
            await mongoDB.init();
            process.on('exit', () => {
                mongoDB.close();
            });
            this.app.use('/tasks', new TasksRoute().getRouter());

            this.app.listen(process.env.APP_PORT, () => {
                console.log("Server is running on port " + process.env.APP_PORT);
            })
        } catch (err) {
            console.log(err);
        }
    }
}

const app = new App();
app.init();