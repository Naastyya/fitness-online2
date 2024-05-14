import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import router from "./controllers/auth.js";
import t_router from "./controllers/trainings.js";
import multer from 'multer';
import * as path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';


mongoose.connect(
    'mongodb+srv://nastyaslota31:m7PzMsuXeB7j8G6O@train.frmswyv.mongodb.net/traine?retryWrites=true&w=majority&appName=Train',
).then(() => console.log('DB ok'))
    .catch((err) => console.log('All bad', err));

const app = express();

app.use(cors({ credentials: true, origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(session({
  secret: 'fweuonqijwehqfojimejnuwhe98fhcquijpqoejcpeuhquhwec',
  resave: false,
  saveUninitialized: true,
}));

app.use('/', router);
app.use('/', t_router);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server start: http://localhost:4444/');
});