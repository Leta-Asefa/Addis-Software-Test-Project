export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  url:string,
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Stats {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: { genre: string; count: number }[];
  songsAndAlbumsByArtist: { artist: string; songCount: number; albumCount: number }[];
  songsByAlbum: { album: string; artist: string; count: number }[];
}