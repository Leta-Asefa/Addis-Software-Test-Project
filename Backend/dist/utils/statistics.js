import Song from '../models/Songs.js';
export const getStatistics = async () => {
    const totalSongs = await Song.countDocuments();
    const totalArtists = (await Song.distinct('artist')).length;
    const totalAlbums = (await Song.distinct('album')).length;
    const totalGenres = (await Song.distinct('genre')).length;
    // songs per genre
    const songsByGenre = await Song.aggregate([
        { $group: { _id: '$genre', count: { $sum: 1 } } },
        { $project: { genre: '$_id', count: 1, _id: 0 } }
    ]);
    // songs & albums per artist
    const songsAndAlbumsByArtist = await Song.aggregate([
        { $group: { _id: '$artist', songs: { $sum: 1 }, albums: { $addToSet: '$album' } } },
        { $project: { artist: '$_id', songCount: '$songs', albumCount: { $size: '$albums' }, _id: 0 } }
    ]);
    // songs per album
    const songsByAlbum = await Song.aggregate([
        { $group: { _id: { album: '$album', artist: '$artist' }, count: { $sum: 1 } } },
        { $project: { album: '$_id.album', artist: '$_id.artist', count: 1, _id: 0 } }
    ]);
    return {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        songsByGenre,
        songsAndAlbumsByArtist,
        songsByAlbum,
    };
};
//# sourceMappingURL=statistics.js.map