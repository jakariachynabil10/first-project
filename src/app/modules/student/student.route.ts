import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.delete('/:singleId', StudentControllers.deleteSingleStudents);
router.get('/:singleId', StudentControllers.getSingleStudents);
router.patch('/:singleId', StudentControllers.updateSingleStudents);

export const StudentRoutes = router;
