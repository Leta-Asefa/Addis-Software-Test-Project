import { Router } from 'express';
import {
  getAllSongs,
  createSong,
  updateSong,
  deleteSong,
  getStats,
} from '../controllers/songController.js';

const router = Router();

router.get('/', getAllSongs);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
router.get('/stats', getStats);

export default router;