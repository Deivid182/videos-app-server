import User from '../models/user.model.js';
import { createJwt } from '../libs/create-jwt.js';

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, username, password });

    await newUser.save();

    res.json({ message: 'Registered successfully' });
  } catch (error) {
    console.log(error, 'ERROR_REGISTER');
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = createJwt({
    _id: user._id,
    username: user.username,
    email: user.email,
  });

  res.json({
    profile: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token
  });
};

export const profile = async (req, res) => {
  res.json(req.user);
};
