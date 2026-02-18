import Song from '../models/Songs.js';
import { getStatistics } from '../utils/statistics.js';
export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.json(songs);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
export const createSong = async (req, res) => {
    try {
        const { title, artist, album, genre, url } = req.body;
        const newSong = new Song({ title, artist, album, genre, url });
        await newSong.save();
        res.status(201).json(newSong);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
export const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist, album, genre, url } = req.body;
        const updatedSong = await Song.findByIdAndUpdate(id, { title, artist, album, genre, url }, { new: true });
        if (!updatedSong)
            return res.status(404).json({ message: 'Song not found' });
        res.json(updatedSong);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
export const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Song.findByIdAndDelete(id);
        if (!deleted)
            return res.status(404).json({ message: 'Song not found' });
        res.json({ message: 'Song deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
export const getStats = async (req, res) => {
    try {
        const stats = await getStatistics();
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
//# sourceMappingURL=songController.js.map