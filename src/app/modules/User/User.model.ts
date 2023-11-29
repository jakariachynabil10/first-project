import { Schema, model } from 'mongoose';
import { TUser } from './User.interface';
import confiq from '../../confiq';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(confiq.bcrypt_salt_round),
  );
  next();
});

// post save middleware
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

export const UserModel = model<TUser>('User', userSchema);
