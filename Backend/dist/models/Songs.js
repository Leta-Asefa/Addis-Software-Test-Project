import mongoose, { Document, Schema } from 'mongoose';
const SongSchema = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true },
    url: { type: String, required: true },
}, { timestamps: true });
export default mongoose.model('Song', SongSchema);
//# sourceMappingURL=Songs.js.map