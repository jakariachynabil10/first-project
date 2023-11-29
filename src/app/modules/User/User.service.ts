import httpStatus from 'http-status';
import mongoose from 'mongoose';
import confiq from '../../confiq';
// import AppError from '../../errors/AppError';

import { AcademicSemester } from './../academicSemester/academicSemester.model';
import { TUser } from './User.interface';
import { generateStudentId } from './User.utils';
import { UserModel } from './User.model';
import { StudentModel } from '../student/student.model';
import { Student } from '../student/student.interface';


const createStudentIntoDB = async (password: string, payload: Student) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (confiq.default_pass as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)

    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};