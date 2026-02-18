import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import type { RootState } from '../store/rootReducer';

const Container = styled.div`
  padding: 20px;
  background: #e9ecef;
  border-radius: 8px;
  margin: 20px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const StatCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StatsDashboard: React.FC = () => {
  const { data: stats, loading } = useSelector((state: RootState) => state.stats);

  if (loading && !stats) return <div>Loading stats...</div>;
  if (!stats) return null;

  return (
    <Container>
      <h2>Statistics</h2>
      <StatGrid>
        <StatCard>
          <h3>Total Songs</h3>
          <p>{stats.totalSongs}</p>
        </StatCard>
        <StatCard>
          <h3>Total Artists</h3>
          <p>{stats.totalArtists}</p>
        </StatCard>
        <StatCard>
          <h3>Total Albums</h3>
          <p>{stats.totalAlbums}</p>
        </StatCard>
        <StatCard>
          <h3>Total Genres</h3>
          <p>{stats.totalGenres}</p>
        </StatCard>
      </StatGrid>

      <h3>Songs by Genre</h3>
      <StatGrid>
        {stats.songsByGenre.map((item) => (
          <StatCard key={item.genre}>
            <h4>{item.genre}</h4>
            <p>{item.count} songs</p>
          </StatCard>
        ))}
      </StatGrid>

      <h3>Songs & Albums per Artist</h3>
      <StatGrid>
        {stats.songsAndAlbumsByArtist.map((item) => (
          <StatCard key={item.artist}>
            <h4>{item.artist}</h4>
            <p>Songs: {item.songCount} | Albums: {item.albumCount}</p>
          </StatCard>
        ))}
      </StatGrid>

      <h3>Songs per Album</h3>
      <StatGrid>
        {stats.songsByAlbum.map((item, idx) => (
          <StatCard key={idx}>
            <h4>{item.album}</h4>
            <p>by {item.artist}</p>
            <p>{item.count} songs</p>
          </StatCard>
        ))}
      </StatGrid>
    </Container>
  );
};

export default StatsDashboard;