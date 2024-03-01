import { z } from 'zod';

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export const UserAccountSchema = z
  .object({
    email: z
      .string()
      .email('This is not a valid email.')
      .trim()
      .min(8, { message: 'Email must contain at least 8 character(s).' })
      .max(50),
    username: z
      .string()
      .trim()
      .min(8, { message: 'Username must contain at least 8 character(s).' })
      .max(50),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must contain at least 8 character(s).' })
      .max(50)
      .regex(passwordRegex, {
        message:
          'Password must have at least 8 characters, at least 1 uppercase letter, and at least 1 special character.',
      }),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: 'Password must contain at least 8 character(s).' })
      .max(50),
    firstName: z
      .string()
      .trim()
      .min(1, { message: 'First Name is required.' })
      .max(50),
    middleName: z.string().trim().max(50).optional(),
    lastName: z
      .string()
      .trim()
      .min(1, { message: 'Last Name is required.' })
      .max(50),
    birthday: z
      .string()
      .refine(
        (value) => value !== undefined && value !== null && value !== '',
        {
          message: 'Birthday is required.',
        }
      )
      .refine(
        (value) => {
          const eighteenYearsAgo = new Date();
          eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

          return new Date(value) <= eighteenYearsAgo;
        },
        {
          message: 'Age must be 18 years or older',
        }
      ),
  })
  .refine(
    (value) => {
      return value.password === value.confirmPassword;
    },
    { message: 'Password is not matched.', path: ['confirmPassword'] }
  );

export const UserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First Name is required.' })
    .max(50),
  middleName: z.string().trim().max(50).optional(),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last Name is required.' })
    .max(50),
  birthday: z
    .date()
    .refine((value) => value !== undefined && value !== null, {
      message: 'Birthday is required.',
    })
    .refine(
      (value) => {
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

        return value <= eighteenYearsAgo;
      },
      {
        message: 'Age must be 18 years or older',
      }
    ),
  age: z
    .number()
    .int()
    .nonnegative()
    .safe()
    .gte(18, { message: 'User must be 18 year or older' }),
  updatedAt: z.date().optional(),
});

export const AccountSchema = z.object({
  email: z
    .string()
    .email('This is not a valid email.')
    .trim()
    .min(8, { message: 'Email must contain at least 8 character(s).' })
    .max(50),
  username: z
    .string()
    .trim()
    .min(8, { message: 'Username must contain at least 8 character(s).' })
    .max(50),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must contain at least 8 character(s).' })
    .max(50),
  role: z.string().trim().min(1).max(50),
  updatedAt: z.date().optional(),
});
