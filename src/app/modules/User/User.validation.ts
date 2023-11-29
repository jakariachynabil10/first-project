import z from 'zod';

const userSchemaValidation = z.object({
  password: z
    .string()
    .max(20, { message: 'password can not be more then 20 charachters' })
    .optional(),
});

export const UserValidation = {
  userSchemaValidation,
};
