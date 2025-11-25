import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getDashboradData } from '../controllers/dashboardController.js'

const dashboardRouter = express.Router();

dashboardRouter.get('/', protect, getDashboradData)

export default dashboardRouter;
