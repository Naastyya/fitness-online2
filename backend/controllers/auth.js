import {registerValidator} from "../validations/auth.js";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import {User} from "../models/user.js";
import express from 'express';
import {TrainingHistory} from "../models/traine_history.js";

const router = express.Router();

router.post('/auth/register', registerValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new User({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            passwordHash: passwordHash,
        });

        const user = await doc.save();

        req.session.user = user;

        res.json(user);

    } catch (err) {
        console.log(err)
        res.json(err);
    }
});

router.post('/auth/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).json({message: 'Користувача з таким email не знайдено'});
        }

        const isMatch = await bcrypt.compare(req.body.password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({message: 'Неправильний пароль, спробуйте знову'});
        }

        req.session.user = user;
        res.json(user);

    } catch (err) {
        console.log(err)
        res.json(err);
    }
});

router.get('/user/trainingHistory', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    if (!req.query.date) {
        return res.status(400).send('Дата не вказана в запиті');
    }

    const user = await User.findById(req.session.user._id);
    console.log('User:', user);  // Додайте це

    const date = new Date(req.query.date);
    date.setUTCHours(0, 0, 0, 0);
    console.log('Date:', date);  // Додайте це

    const startOfDay = new Date(req.query.date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setUTCHours(23, 59, 59, 999);

    let trainingHistories = await TrainingHistory.find({
        user: user._id,
        date: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    }).populate('trainings').populate('programs');


    console.log('Training Histories:', trainingHistories);  // Додайте це

    res.json(trainingHistories);
});

router.get('/user/yearlyTrainingHistory', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    const user = await User.findById(req.session.user._id);

    const startOfYear = new Date(Date.UTC(2024, 0, 1));  // Початок 2024 року
    const endOfYear = new Date(Date.UTC(2025, 0, 1));  // Кінець 2024 року

    let trainingHistories = await TrainingHistory.find({
        user: user._id,
        date: {
            $gte: startOfYear,
            $lt: endOfYear
        }
    }).populate('trainings').populate('programs');

    let monthlySummaries = {};

    for (let i = 0; i < 12; i++) {
        monthlySummaries[`${2024}.${i+1}`] = {
            count_training: 0,
            count_programs: 0,
            total_weight: 0,
            count_weight_changed: 0
        };
    }

    trainingHistories.forEach(history => {
        let month = history.date.getUTCMonth() + 1;  // Місяці починаються з 0
        monthlySummaries[`${2024}.${month}`].count_training += history.trainings.length;
        monthlySummaries[`${2024}.${month}`].count_programs += history.programs.length;
        if (history.weightChanged) {
            monthlySummaries[`${2024}.${month}`].total_weight += history.newWeight;
            monthlySummaries[`${2024}.${month}`].count_weight_changed++;
        }
    });

    for (let i = 0; i < 12; i++) {
        let summary = monthlySummaries[`${2024}.${i+1}`];
        summary.average_weight = summary.count_weight_changed > 0 ? summary.total_weight / summary.count_weight_changed : 0;
    }

    res.json(monthlySummaries);
});


router.get('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }

        //res.redirect('/');
        res.json("You logout");
    });
});

router.put('/user/name', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    if (!req.body.name) {
        return res.status(400).send('Імя не вказано в запиті');
    }

    const user = await User.findById(req.session.user._id);
    user.first_name = req.body.name;
    await user.save();

    res.send('Вік успішно оновлено');
});

router.put('/user/lastname', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    if (!req.body.lastname) {
        return res.status(400).send('Прізвище не вказано в запиті');
    }

    const user = await User.findById(req.session.user._id);
    user.last_name = req.body.lastname;
    await user.save();

    res.send('Вік успішно оновлено');
});

router.put('/user/age', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    if (!req.body.age) {
        return res.status(400).send('Вік не вказано в запиті');
    }

    const user = await User.findById(req.session.user._id);
    user.age = req.body.age;
    await user.save();

    res.send('Вік успішно оновлено');
});

router.put('/user/weight', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    if (!req.body.weight) {
        return res.status(400).send('Вага не вказана в запиті');
    }

    const user = await User.findById(req.session.user._id);
    const today = new Date().setHours(0, 0, 0, 0);

    const trainingHistory = await TrainingHistory.findOne({user: user._id, date: today});

    if (trainingHistory && trainingHistory.weightChanged) {
        return res.status(400).send('Вага вже була змінена сьогодні');
    }

    if (!trainingHistory) {
        const newTrainingHistory = new TrainingHistory({
            user: user._id,
            weightChanged: true,
            newWeight: req.body.weight,
        });
        await newTrainingHistory.save();
    } else {
        trainingHistory.weightChanged = true;
        trainingHistory.newWeight = req.body.weight;
        await trainingHistory.save();
    }

    user.weight = req.body.weight;
    await user.save();

    res.send('Вагу успішно оновлено');
});

router.put('/user/height', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    if (!req.body.height) {
        return res.status(400).send('Вік не вказано в запиті');
    }

    const user = await User.findById(req.session.user._id);
    user.height = req.body.height;
    await user.save();

    res.send('Зріст успішно оновлено');
});

router.put('/user/experience', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    if (!req.body.experience) {
        return res.status(400).send('Вік не вказано в запиті');
    }

    const user = await User.findById(req.session.user._id);
    user.experience = req.body.experience;
    await user.save();

    res.send('Досвід успішно оновлено');
});

router.get('/checkAuth', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    res.send('Досвід успішно оновлено');
});


router.get('/userinfo', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Неавторизований доступ: Ви повинні увійти до системи!');
    }

    const user = await User.findById(req.session.user._id)
        .populate('favoriteTrainings')
        .populate('favoritePrograms');

    if (!user) {
        return res.status(404).send('Користувача не знайдено');
    }

    res.json(user);
});

export default router;