import { body } from 'express-validator'

export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 8}),
    body('first_name').isLength({ min: 8}),
    body('last_name').isLength({ min: 8}),
]