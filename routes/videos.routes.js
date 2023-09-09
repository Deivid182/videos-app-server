import { Router } from 'express';
import checkAuth from '../middleware/check-auth.js';
import { createVideo, deleteVideo, getVideo, getVideos, getVideosByUserId, toggleLikeVideo, togglePublish, updateVideo } from '../controllers/videos.controller.js';

const videosRouter = Router();

videosRouter.post('/', checkAuth, createVideo)
videosRouter.get('/', checkAuth, getVideos)
videosRouter.get('/profile/:userId', checkAuth, getVideosByUserId)
videosRouter.get('/:videoId', checkAuth, getVideo)
videosRouter.put('/:videoId', checkAuth, updateVideo)
videosRouter.delete('/:videoId', checkAuth, deleteVideo)
videosRouter.put('/publish/:videoId', checkAuth, togglePublish)
videosRouter.put('/like/:videoId', checkAuth, toggleLikeVideo)


export default videosRouter