import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateSong from './pages/CreateSong';
import AllSongs from './pages/AllSongs';
import Artists from './pages/Artists';
import Albums from './pages/Albums';
import Genres from './pages/Genres';
import { fetchSongsRequest } from './store/songs/songsSlice';
import { fetchStatsRequest } from './store/stats/statsSlice';
import styled from '@emotion/styled';
import GlobalPlayer from './components/GlobalPlayer';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const AppContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSongsRequest());
    dispatch(fetchStatsRequest());
  }, [dispatch]);
  return (
    <AppContainer>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateSong />} />
        <Route path="/songs" element={<AllSongs />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/genres" element={<Genres />} />
      </Routes>
      <GlobalPlayer/>
    </AppContainer>
  );
};

function App() {
  return (
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
  );
}

export default App;