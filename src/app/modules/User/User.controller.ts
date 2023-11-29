import { Request, Response } from 'express';
import { UserService } from './User.service';
import catchAsync from '../../Utils/catchAsync';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;
  const result = await UserService.createStudentIntoDB(studentData, password);
  res.status(200).json({
    success: true,
    message: 'Student is created Successfully',
    data: result,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});

export const UserController = {
  createStudent,
};
