import { useDispatch } from 'react-redux';
import { fetchSongsRequest } from '../store/songs/songsSlice';
import styled from '@emotion/styled';
import * as React from 'react';

const Select = styled.select`
  padding: 8px;
  margin: 10px 20px;
`;

interface Props {
  genres: string[];
}

const Filter: React.FC<Props> = ({ genres }) => {
  const dispatch = useDispatch();

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    // In a real app, you'd pass genre as query param to API
    // For simplicity, we'll just refetch all (or you could implement filter in API)
    dispatch(fetchSongsRequest()); 
    // Ideally, you'd call an API endpoint with ?genre=...
  };

  return (
    <Select onChange={handleFilter}>
      <option value="">All Genres</option>
      {genres.map((g) => (
        <option key={g} value={g}>{g}</option>
      ))}
    </Select>
  );
};

export default Filter;