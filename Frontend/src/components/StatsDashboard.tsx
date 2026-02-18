import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import {
  Music,
  Users,
  Disc,
  Tag,
  PieChart,
  Mic2,
  Album,
  ListMusic,
} from 'lucide-react';
import type { RootState } from '../store/rootReducer';

// Animations
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Main container
const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

// Section styling
const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;

  svg {
    color: #3b82f6;
  }
`;

// Grid layouts
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

// Stat card base
const StatCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const IconWrapper = styled.div<{ color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color = '#3b82f6' }) => color}20;
  color: ${({ color = '#3b82f6' }) => color};
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.2;
`;

// Small card for breakdowns
const SmallCard = styled(StatCard)`
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

const SmallCardTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const SmallCardDetail = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

// Loading skeleton
const SkeletonCard = styled(StatCard)`
  animation: ${pulse} 1.5s ease-in-out infinite;
  background: #e5e7eb;
  min-height: 96px;
`;

const SkeletonIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #d1d5db;
`;

const SkeletonText = styled.div<{ width?: string }>`
  height: 1rem;
  background: #d1d5db;
  border-radius: 4px;
  width: ${({ width = '100px' }) => width};
  margin-bottom: 0.5rem;
`;

const StatsDashboard: React.FC = () => {
  const { data: stats, loading } = useSelector((state: RootState) => state.stats);

  // Loading state with skeletons
  if (loading && !stats) {
    return (
      <DashboardContainer>
        <Section>
          <SectionTitle>
            <PieChart size={24} />
            Overview
          </SectionTitle>
          <Grid>
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i}>
                <SkeletonIcon />
                <div style={{ flex: 1 }}>
                  <SkeletonText width="80px" />
                  <SkeletonText width="40px" />
                </div>
              </SkeletonCard>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>
            <ListMusic size={24} />
            Songs by Genre
          </SectionTitle>
          <Grid>
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i}>
                <SkeletonText width="120px" />
                <SkeletonText width="60px" />
              </SkeletonCard>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>
            <Mic2 size={24} />
            Songs & Albums per Artist
          </SectionTitle>
          <Grid>
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i}>
                <SkeletonText width="140px" />
                <SkeletonText width="100px" />
              </SkeletonCard>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>
            <Album size={24} />
            Songs per Album
          </SectionTitle>
          <Grid>
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i}>
                <SkeletonText width="150px" />
                <SkeletonText width="120px" />
                <SkeletonText width="60px" />
              </SkeletonCard>
            ))}
          </Grid>
        </Section>
      </DashboardContainer>
    );
  }

  if (!stats) return null;

  // Helper to get icon color based on index
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <DashboardContainer>
      {/* Overview Section */}
      <Section>
        <SectionTitle>
          <PieChart size={24} />
          Overview
        </SectionTitle>
        <Grid>
          <StatCard>
            <IconWrapper color="#3b82f6">
              <Music size={24} />
            </IconWrapper>
            <StatContent>
              <StatLabel>Total Songs</StatLabel>
              <StatValue>{stats.totalSongs}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <IconWrapper color="#10b981">
              <Users size={24} />
            </IconWrapper>
            <StatContent>
              <StatLabel>Total Artists</StatLabel>
              <StatValue>{stats.totalArtists}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <IconWrapper color="#f59e0b">
              <Disc size={24} />
            </IconWrapper>
            <StatContent>
              <StatLabel>Total Albums</StatLabel>
              <StatValue>{stats.totalAlbums}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <IconWrapper color="#ef4444">
              <Tag size={24} />
            </IconWrapper>
            <StatContent>
              <StatLabel>Total Genres</StatLabel>
              <StatValue>{stats.totalGenres}</StatValue>
            </StatContent>
          </StatCard>
        </Grid>
      </Section>

      {/* Songs by Genre */}
      <Section>
        <SectionTitle>
          <ListMusic size={24} />
          Songs by Genre
        </SectionTitle>
        <Grid>
          {stats.songsByGenre.map((item, index) => (
            <SmallCard key={item.genre}>
              <IconWrapper color={colors[index % colors.length]} style={{ width: 32, height: 32 }}>
                <Tag size={16} />
              </IconWrapper>
              <SmallCardTitle>{item.genre}</SmallCardTitle>
              <SmallCardDetail>
                <Music size={14} />
                {item.count} {item.count === 1 ? 'song' : 'songs'}
              </SmallCardDetail>
            </SmallCard>
          ))}
        </Grid>
      </Section>

      {/* Songs & Albums per Artist */}
      <Section>
        <SectionTitle>
          <Mic2 size={24} />
          Songs & Albums per Artist
        </SectionTitle>
        <Grid>
          {stats.songsAndAlbumsByArtist.map((item, index) => (
            <SmallCard key={item.artist}>
              <IconWrapper color={colors[index % colors.length]} style={{ width: 32, height: 32 }}>
                <Users size={16} />
              </IconWrapper>
              <SmallCardTitle>{item.artist}</SmallCardTitle>
              <SmallCardDetail>
                <Music size={14} /> {item.songCount} {item.songCount === 1 ? 'song' : 'songs'}
              </SmallCardDetail>
              <SmallCardDetail>
                <Disc size={14} /> {item.albumCount} {item.albumCount === 1 ? 'album' : 'albums'}
              </SmallCardDetail>
            </SmallCard>
          ))}
        </Grid>
      </Section>

      {/* Songs per Album */}
      <Section>
        <SectionTitle>
          <Album size={24} />
          Songs per Album
        </SectionTitle>
        <Grid>
          {stats.songsByAlbum.map((item, index) => (
            <SmallCard key={`${item.album}-${item.artist}`}>
              <IconWrapper color={colors[index % colors.length]} style={{ width: 32, height: 32 }}>
                <Disc size={16} />
              </IconWrapper>
              <SmallCardTitle>{item.album}</SmallCardTitle>
              <SmallCardDetail>
                <Users size={14} /> {item.artist}
              </SmallCardDetail>
              <SmallCardDetail>
                <Music size={14} /> {item.count} {item.count === 1 ? 'song' : 'songs'}
              </SmallCardDetail>
            </SmallCard>
          ))}
        </Grid>
      </Section>
    </DashboardContainer>
  );
};

export default StatsDashboard;