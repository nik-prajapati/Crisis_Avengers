import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
  role: {
    type: Number,
    required: true,
    validate: (role: number) => role == 0 || role == 1,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
