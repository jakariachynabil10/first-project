/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import catchAsync from '../../Utils/catchAsync';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: 'Student retrieved Successfully',
    data: result,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});
const getSingleStudents = catchAsync(async (req: Request, res: Response) => {
  const { singleId } = req.params;
  const result = await StudentServices.getSingleStudentsFromDB(singleId);
  res.status(200).json({
    success: true,
    message: 'Student retrieved Successfully',
    data: result,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});

const deleteSingleStudents = catchAsync(async (req: Request, res: Response) => {
  const { singleId } = req.params;
  const result = await StudentServices.deleteSingleStudentsFromDB(singleId);
  res.status(200).json({
    success: true,
    message: 'Student Deleted Successfully',
    data: result,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});

const updateSingleStudents = catchAsync(async (req: Request, res: Response) => {
  const { singleId } = req.params;
  const updateData = req.body.student;
  const result = await StudentServices.updateSingleStudentsFromDB(
    singleId,
    updateData,
  );
  res.status(200).json({
    success: true,
    message: 'Student Updated Successfully',
    data: result,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
  updateSingleStudents,
};
