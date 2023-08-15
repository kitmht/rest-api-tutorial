import mongoose from 'mongoose';

interface UserSchemaType {
  username: string;
  email: string;
  password: string;
  sessionToken: string | undefined;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  sessionToken: { type: String, select: false },
});

const UserModel = mongoose.model('User', UserSchema);

const getUsers = () => UserModel.find();

const getUserByEmail = (email: string) => UserModel.findOne({ email });

const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ sessionToken });

const getUserById = (id: string) => UserModel.findById(id);

const createUser = async (value: UserSchemaType) => {
  const user = await new UserModel(value).save();
  return user.toObject();
};

const updateUserById = async (id: string, value: UserSchemaType) => {
  const user = await UserModel.findByIdAndUpdate(id, value);
  return user?.toObject();
};

const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export {
  UserModel,
  getUsers,
  getUserByEmail,
  getUserBySessionToken,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
