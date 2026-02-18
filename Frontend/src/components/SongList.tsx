import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest, deleteSongRequest } from '../store/songs/songsSlice';
import { fetchStatsRequest } from '../store/stats/statsSlice';
import SongForm from './SongForm';
import styled from '@emotion/styled';
import type { Song } from '../types';
import type { RootState } from '../store/rootReducer';

const Container = styled.div`
  padding: 20px;
`;

const SongItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading } = useSelector((state: RootState) => state.songs);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest());
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteSongRequest(id));
    }
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
  };

  const handleFormClose = () => {
    setEditingSong(null);
  };

  if (loading && songs.length === 0) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Songs</h2>
      <SongForm songToEdit={editingSong} onClose={handleFormClose} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {songs.map((song) => (
          <SongItem key={song._id}>
            <div>
              <strong>{song.title}</strong> by {song.artist} | Album: {song.album} | Genre: {song.genre}
            </div>
            <div>
              <Button onClick={() => handleEdit(song)}>Edit</Button>
              <Button onClick={() => handleDelete(song._id)}>Delete</Button>
            </div>
          </SongItem>
        ))}
      </ul>
    </Container>
  );
};

export default SongList;