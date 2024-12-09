import mongoose from "mongoose";

/**
User {
  _id: ObjectId // user's ID
  fullName: string // user's full name
  email: string // user's email
  password: string // user's password
  admin: boolean // holds whether or not a user is an admin
}
*/

const userSchema = new mongoose.Schema ({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
});

export type UserState = Omit<
  mongoose.InferSchemaType<typeof userSchema>,
  'password'
> & { _id: string };

export const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');