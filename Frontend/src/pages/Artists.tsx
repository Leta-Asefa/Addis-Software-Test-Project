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

const ArtistItem = styled.div<{ active: boolean }>`
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

const Artists = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const artists = Array.from(new Set(songs.map(s => s.artist))).sort();

  return (
    <Container>
      <Sidebar>
        <h3>Artists</h3>
        <ArtistItem active={selectedArtist === null} onClick={() => setSelectedArtist(null)}>
          All Artists
        </ArtistItem>
        {artists.map(artist => (
          <ArtistItem
            key={artist}
            active={selectedArtist === artist}
            onClick={() => setSelectedArtist(artist)}
          >
            {artist}
          </ArtistItem>
        ))}
      </Sidebar>
      <Content>
        <SongList filterBy={selectedArtist ? { artist: selectedArtist } : undefined} />
      </Content>
    </Container>
  );
};

export default Artists;