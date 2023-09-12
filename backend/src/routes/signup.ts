import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import SignupController from '../controllers/SignupController';

const router = Router();

router.post(
  '/',
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password not strong enough: must be atleast 8 characters long and must contain atleast one lowercase, uppercase and special character'
    ),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.json({
        error: true,
        message: err
          .array()
          .map((val) => val.msg)
          .join(', '),
      });
    } else {
      next();
    }
  },
  SignupController
);

export default router;
