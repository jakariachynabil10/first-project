import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created Successfully',
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err : any) {
    res.status(500).json({
      success: true,
      message: err.message,
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student retrieved Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message,
      error: err,
    });
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { singleId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(singleId);
    res.status(200).json({
      success: true,
      message: 'Student retrieved Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message,
      error: err,
    });
  }
};

const deleteSingleStudents = async (req: Request, res: Response) => {
  try {
    const { singleId } = req.params;
    const result = await StudentServices.deleteSingleStudentsFromDB(singleId);
    res.status(200).json({
      success: true,
      message: 'Student Deleted Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message,
      error: err,
    });
  }
};

const updateSingleStudents = async (req: Request, res: Response) => {
  try {
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
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message,
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
  updateSingleStudents,
};
