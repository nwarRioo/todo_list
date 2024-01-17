import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { mongoDB } from "./repository/mongoDB";
import { Task } from "./models/Task";
dotenv.config();

class App {
    private app: Express;
    constructor() {
        this.app = express();
        this.app.use(cors());
    }

    public init = async (): Promise<void> => {
        try {
            await mongoDB.init();
            process.on('exit', () => {
                mongoDB.close();
            });
            this.app.listen(process.env.APP_PORT, () => {
                console.log("Server is running on port " + process.env.APP_PORT);
            })


            const newPost = new Task({title: "Go shop"});
            const data = await newPost.save();
        } catch (err) {
            console.log("[ERROR]: " + err);
        }
    }
}

const app = new App();
app.init();