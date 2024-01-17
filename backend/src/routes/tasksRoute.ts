import { Request, Response, Router } from "express";
import { MongoDB, mongoDB } from "../repository/mongoDB";
import express from "express";
import ITask from "../interfaces/ITask";
import IError from "../interfaces/IError";
import IResponse from "../interfaces/IResponse";


export class TasksRoute {
    private repository: MongoDB;
    private router: Router;

    constructor() {
        this.repository = mongoDB;
        this.router = express.Router();
        this.router.get("/", this.getTasks);
        this.router.post("/", this.addTask);
        this.router.delete("/:id", this.deleteTaskById);
        this.router.patch("/:id", this.updateTaskById);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getTasks = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<ITask[] | IError> = await this.repository.getTasks();
        res.status(response.status).send(response.result);
    };

    private addTask = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<ITask | IError> = await this.repository.addTask(req.body);
        res.status(response.status).send(response.result);
    };

    private deleteTaskById = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<string | IError> = await this.repository.deleteTaskById(req.params.id);
        res.status(response.status).send(response.result);
    };

    private updateTaskById = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<ITask | IError> = await this.repository.updateTaskById(req.params.id, req.body);
        res.status(response.status).send(response.result);
    };
}