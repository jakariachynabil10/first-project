import { Schema, model } from 'mongoose';
import { Guardian, Student, UserName } from './student.interface';

// import validator from 'validator';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: {
    type: String,
    required: true,
    // validate : {
    //   validator : (value : string) => validator.isAlpha(value),
    //   message : "{value} is not valid"
    // }
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  contactNo: { type: String, required: true },
});

const StudentSchema = new Schema<Student>({
  id: { type: String },
  user : {
    type : Schema.Types.ObjectId,
    require : true,
    unique : true,
    ref : 'User'
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'Female'],
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  isActive: { type: Boolean, default: true, required: true },
  profileImg: String,
  admissionSemester : {
    type : Schema.Types.ObjectId,
    ref : 'AcademicSemester'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre/save middleware/hook


// Query Middleware

StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const StudentModel = model<Student>('Student', StudentSchema);
