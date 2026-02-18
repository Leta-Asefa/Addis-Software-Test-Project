import { useSelector } from 'react-redux';
import { useState } from 'react';
import SongList from '../components/SongList';
import styled from '@emotion/styled';
import type { RootState } from '../store/rootReducer';

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Sidebar = styled.div`
  width: 200px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
`;

const AlbumItem = styled.div<{ active: boolean }>`
  padding: 8px 12px;
  margin: 4px 0;
  cursor: pointer;
  background-color: ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? 'white' : 'inherit'};
  border-radius: 4px;
  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#e9ecef'};
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Albums = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

  const albums = Array.from(new Set(songs.map(s => s.album))).sort();

  return (
    <Container>
      <Sidebar>
        <h3>Albums</h3>
        <AlbumItem active={selectedAlbum === null} onClick={() => setSelectedAlbum(null)}>
          All Albums
        </AlbumItem>
        {albums.map(album => (
          <AlbumItem
            key={album}
            active={selectedAlbum === album}
            onClick={() => setSelectedAlbum(album)}
          >
            {album}
          </AlbumItem>
        ))}
      </Sidebar>
      <Content>
        <SongList filterBy={selectedAlbum ? { album: selectedAlbum } : undefined} />
      </Content>
    </Container>
  );
};

export default Albums;