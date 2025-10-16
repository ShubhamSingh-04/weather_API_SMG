import express from 'express';
import weatherController from '../controllers/weatherController.js';

const router = express.Router();

router.get('/', weatherController);

export default router;
