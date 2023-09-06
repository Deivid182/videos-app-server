import { createAccessToken } from '../libs/verify-jwt.js';
import User from '../models/user.model.js';


export const register = async (req, res) => {
  const { email, username, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = new User({ email, username, password });


  const userSaved = await newUser.save();
  const token = await createAccessToken({ _id: userSaved._id });

  res.cookie('jwt', token, {
    httpOnly: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
  })

  res.json({ message: 'Registered successfully' });
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ email });

  if(!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = await createAccessToken({
    id: user._id,
    username: user.username,
    email: user.email
  });

  res.cookie('token', token, {
    httpOnly: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
  })

  res.json({
    id: user._id,
    username: user.username,
    email: user.email
  });
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(0)
  })
  return res.json({ message: 'Logged out' });
}

export const profile = async (req, res) => {
  res.json(req.user);
}