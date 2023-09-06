import User from '../models/user.model.js';

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error, 'ERROR_GET_USER');
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const toggleFollow = async (req, res) => {
  try {
    const { userId } = req.params;

    const userToFollow = await User.findById(userId);
    const user = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }


    if(userToFollow.followers.includes(user._id)) {
      userToFollow.followers = userToFollow.followers.filter((id) => id.toString() !== user._id.toString());
    } else {
      userToFollow.followers.push(user._id);
    }
    const userToFollowSaved = await userToFollow.save();

    const followingCount = await User.countDocuments({ followers: user._id });

    res.status(200).json({userToFollowSaved, followingCount});

  } catch (error) {
    console.log(error, 'ERROR_TOGGLE_FOLLOW');
    res.status(500).json({ message: 'Internal server error' });
  }
}