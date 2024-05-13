import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Application = express();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const userResource = mongoose.model("users", userSchema);

app.get("/users", async (req: Request, res: Response) =>{
    const users = await await userResource.find();
    res.status(200).json(users);
});

const EXPRESS_PORT = 3000;
const MONGOOSE_URL = "mongodb://root:password@localhost:27017/users?authSource=admin";

(async function main() {
    await mongoose.connect(MONGOOSE_URL);
    try {
        app.listen(EXPRESS_PORT, () => {
            console.log(`Server is running at http://localhost:${EXPRESS_PORT}`);

        })
    } catch (error) {
        console.error(error);
    }
})();
