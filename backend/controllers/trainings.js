import express, {json} from 'express';
import {Program, Training} from "../models/training.js";
import multer from "multer";
import {User} from "../models/user.js";
import {TrainingHistory} from "../models/traine_history.js";
import authenticateToken from '../index.js';

const t_router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

t_router.post('/program', upload.single('image'), async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
        }

        const trainingIds = req.body.trainings;

        if (trainingIds.length > 5) {
            return res.status(400).send('Максимальна кількість тренувань в програмі - 5');
        }

        const trainings = await Training.find({'_id': {$in: trainingIds}});

        if (!trainings.length) {
            return res.status(404).send('Тренування не знайдено');
        }

        const program = new Program({
            name: req.body.name,
            description: req.body.description,
            image: '/images/' + req.file.filename,
            trainings: trainingIds,
            creator: req.session.user._id
        });

        const savedProgram = await program.save();
        res.json(savedProgram);
    } catch (err) {
        console.log(err)
        res.json(err);
    }
});


t_router.post('/training', upload.fields([{name: 'image', maxCount: 1}, {
    name: 'imageLink',
    maxCount: 1
}]), async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    const training = new Training({
        name: req.body.name,
        imageLink: '/images/' + req.files.imageLink[0].filename,
        videoLink: req.body.videoLink,
        duration: req.body.duration,
        image: '/images/' + req.files.image[0].filename,
        programs: req.body.programs,
        experience: req.body.experience,
    });

    const savedTraining = await training.save();
    res.json(savedTraining);
});

t_router.put('/program/:programId/trainings', async (req, res) => {
    const { programId } = req.params;
    const { trainingId } = req.body;

    const program = await Program.findById(programId);
    if (!program) {
        return res.status(404).send('Програму не знайдено');
    }

    const training = await Training.findById(trainingId);
    if (!training) {
        return res.status(404).send('Тренування не знайдено');
    }

    // Перевірка, чи вже існує тренування в списку програми
    if (program.trainings.includes(trainingId)) {
        return res.status(400).send('Це тренування вже є в програмі');
    }

    program.trainings.push(trainingId);
    await program.save();

    res.send('Тренування успішно додано до програми');
});


// Кінцева точка, яка повертає всі програми
t_router.get('/programs', async (req, res) => {
    const programs = await Program.find().select('image name description');
    res.json(programs);
});

// Кінцева точка, яка повертає всі тренування
t_router.get('/trainings', async (req, res) => {
    const trainings = await Training.find().select('image name');
    res.json(trainings);
});

// Кінцева точка, яка повертає випадкові програми
t_router.get('/random-programs', async (req, res) => {
    const programs = await Program.aggregate([
        { $sample: { size: 5 } },
        { $project: { image: 1, name: 1, description: 1 } }
    ]).exec();
    res.json(programs);
});

// Кінцева точка, яка повертає випадкові тренування
t_router.get('/random-trainings', async (req, res) => {
    const trainings = await Training.aggregate([
        { $sample: { size: 5 } },
        { $project: { image: 1, name: 1 } }
    ]).exec();
    res.json(trainings);
});

t_router.put('/favoritePrograms', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    const { programId } = req.body;

    const user = await User.findById(req.session.user._id);
    if (!user) {
        return res.status(404).send('Користувача не знайдено');
    }

    user.favoritePrograms.push(programId);
    await user.save();

    res.send('Програму успішно додано до улюблених');
});

// Додавання улюбленого тренування до користувача
t_router.put('/favoriteTrainings', authenticateToken,async (req, res) => {
    const { trainingId } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).send('Користувача не знайдено');
    }

    user.favoriteTrainings.push(trainingId);
    await user.save();

    res.send('Тренування успішно додано до улюблених');
});

// Кінцева точка, яка повертає повну інформацію про тренування
t_router.get('/training/:trainingId', async (req, res) => {
    const { trainingId } = req.params;

    const training = await Training.findById(trainingId);
    if (!training) {
        return res.status(404).send('Тренування не знайдено');
    }

    res.json(training);
});

// Кінцева точка, яка повертає повну інформацію про програму, включаючи тренування
t_router.get('/program/:programId', async (req, res) => {
    const { programId } = req.params;

    const program = await Program.findById(programId).populate('trainings');
    if (!program) {
        return res.status(404).send('Програму не знайдено');
    }

    res.json(program);
});

t_router.put('/training/complete', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    if (!req.body.trainingId) {
        return res.status(400).send('ID тренування не вказано в запиті');
    }

    const user = await User.findById(req.session.user._id);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let trainingHistory = await TrainingHistory.findOne({user: user._id, date: today});

    if (!trainingHistory) {
        trainingHistory = new TrainingHistory({
            user: user._id,
        });
    }

    trainingHistory.trainings.push(req.body.trainingId);
    await trainingHistory.save();

    res.send('Тренування успішно додано');
});

t_router.put('/program/complete', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    if (!req.body.programId) {
        return res.status(400).send('ID програми не вказано в запиті');
    }

    const user = await User.findById(req.session.user._id);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let trainingHistory = await TrainingHistory.findOne({user: user._id, date: today});

    if (!trainingHistory) {
        trainingHistory = new TrainingHistory({
            user: user._id,
        });
    }

    trainingHistory.programs.push(req.body.programId);
    await trainingHistory.save();

    res.send('Програму успішно додано');
});


export default t_router;