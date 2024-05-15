import express from 'express';
import mongoose from 'mongoose';
import router from "./controllers/auth.js";
import t_router from "./controllers/trainings.js";
import * as path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()

mongoose.connect(
    'mongodb+srv://nastyaslota31:m7PzMsuXeB7j8G6O@train.frmswyv.mongodb.net/traine?retryWrites=true&w=majority&appName=Train',
).then(() => console.log('DB ok'))
    .catch((err) => console.log('All bad', err));

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', router);
app.use('/', t_router);

export default function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(req.url)
    console.log(token)
    if (token == null){
        res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = { _id: user.userId }
        next()
    })

}

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server start: http://localhost:4444/');
});