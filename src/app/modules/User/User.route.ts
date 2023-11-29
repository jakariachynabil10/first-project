import express  from 'express';
import { UserController } from './User.controller';
// import { AnyZodObject } from 'zod';

const router = express.Router();

// const validateRequest = (schema: AnyZodObject) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//      await schema.parseAsync({
//       body: req.body,
//     });
//     return next();
//   };
// };

router.post('/create-user', UserController.createStudent);

export const UserRoutes = router;
