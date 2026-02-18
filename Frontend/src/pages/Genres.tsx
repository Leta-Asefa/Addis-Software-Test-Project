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

const GenreItem = styled.div<{ active: boolean }>`
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

const Genres = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const genres = Array.from(new Set(songs.map(s => s.genre))).sort();

  return (
    <Container>
      <Sidebar>
        <h3>Genres</h3>
        <GenreItem active={selectedGenre === null} onClick={() => setSelectedGenre(null)}>
          All Genres
        </GenreItem>
        {genres.map(genre => (
          <GenreItem
            key={genre}
            active={selectedGenre === genre}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </GenreItem>
        ))}
      </Sidebar>
      <Content>
        <SongList filterBy={selectedGenre ? { genre: selectedGenre } : undefined} />
      </Content>
    </Container>
  );
};

export default Genres;