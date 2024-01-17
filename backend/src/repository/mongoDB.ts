import mongoose, { Mongoose } from "mongoose";


class MongoDB {
    private client: Mongoose | null = null;
    public init = async () => {
        this.client = await mongoose.connect(process.env.MONGO_CLIENT_URL!);
        console.log("MongoDB is connected")
    }
    public close = async (): Promise<void> => {
        if (!this.client) return;
        await this.client.disconnect();
    };
}

export const mongoDB = new MongoDB();