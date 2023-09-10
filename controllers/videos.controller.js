import Video from '../models/video.model.js';
import User from '../models/user.model.js';

export const createVideo = async (req, res) => {
  try {
    const { url, title, description, isPublished } = req.body;

    if (!url || !title || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newVideo = new Video({
      url,
      title,
      description,
      isPublished
    });

    newVideo.userId = req.user._id;
    const storedVideo = await newVideo.save();
    const user = await User.findById(req.user._id);

    user.videos.push(storedVideo._id);
    try {
      await user.save();
    } catch (error) {
      res.json({ message: 'Something went wrong' });
    }

    res.status(201).json(storedVideo);
  } catch (error) {
    console.log(error, 'ERROR_CREATE_VIDEO');
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isPublished: true });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error, 'ERROR_GET_VIDEOS');
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getVideosByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const videos = await Video.find({ userId });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error, 'ERROR_GET_VIDEOS_BY_USER_ID');
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(video);
  } catch (error) {
    console.log(error, 'ERROR_GET_VIDEO');
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    console.log(req.body)
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (req.user._id.toString() !== video.userId.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    video.title = req.body.title || video.title;
    video.description = req.body.description || video.description;
    video.url = req.body.url || video.url;
    video.isPublished = req.body.isPublished

    const storedVideo = await video.save();
    console.log(storedVideo)
    res.status(200).json(storedVideo);
  } catch (error) {
    console.log(error, 'ERROR_UPDATE_VIDEO');
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (req.user._id.toString() !== video.userId.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await Video.findByIdAndDelete(videoId);
    res.status(200).json({ message: 'Video deleted' });
  } catch (error) {
    console.log(error);
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (req.user._id.toString() !== video.userId.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if(video.isPublished) {
      video.isPublished = false;
    } else {
      video.isPublished = true;
    }

    await video.save();

    res.json({ messagee: 'Video updated' });
  } catch (error) {
    console.log(error, 'ERROR_TOGGLE_PUBLISH');
  }
};

export const toggleLikeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const isLiked = video.likes.includes(req.user._id);

    if (isLiked) {
      video.likes = video.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      video.likes.push(req.user._id);
    }

    const updatedVideo = await video.save();

    res.status(200).json({ updatedVideo, isLiked });
  } catch (error) {
    console.log(error, 'ERROR_TOGGLE_LIKE_VIDEO');
    res.status(500).json({ message: 'Internal server error' });
  }
};
