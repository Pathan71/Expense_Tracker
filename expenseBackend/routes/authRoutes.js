import express from 'express'
import { protect } from '../middleware/authMiddleware.js'

import { registerUser, loginUser, getUserInfo } from '../controllers/authControllers.js'
import upload from '../middleware/uploadMiddleware.js';

const routerUser = express.Router()

routerUser.post('/register', registerUser);
routerUser.post('/login', loginUser);
routerUser.get('/getUser', protect, getUserInfo);

routerUser.post('/upload-image', upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

export default routerUser;