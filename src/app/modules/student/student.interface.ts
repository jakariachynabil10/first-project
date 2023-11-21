export type Guardian = {
  fatherName: string;
  motherName: string;
  contactNo: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Student = {
  id: string;
  password: string;
  name: UserName;
  gender: 'male' | 'Female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  profileImg?: string;
  isActive: boolean;
  isDeleted: boolean;
};
