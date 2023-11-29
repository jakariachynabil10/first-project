// import { Student } from './student.interface';
import { StudentModel } from './student.model';



const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({id});
  const result = await StudentModel.aggregate([
    {
      $match: { id: id },
    },
  ]);
  return result;
};
const deleteSingleStudentsFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSingleStudentsFromDB = async (id: string, data: any) => {
  const result = await StudentModel.updateOne({ id }, data);
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDB,
  updateSingleStudentsFromDB,
};
