import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSongRequest } from '../store/songs/songsSlice';
import SongForm from './SongForm';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import {
  Music2,
  User,
  Disc3,
  Tag,
  Edit2,
  Trash2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import type { Song } from '../types';
import type { RootState } from '../store/rootReducer';
import { playSong } from '../store/player/playerSlice';
import { Play } from 'lucide-react'; // already imported

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main container
const Container = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

// Header section with title and count
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #3b82f6;
  }
`;

const FilterBadge = styled.span`
  background: #e5e7eb;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 1rem;
`;

const SongCount = styled.span`
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

// Grid layout for song cards
const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

// Individual song card
const SongCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #f3f4f6;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #e5e7eb;
  }
`;

// Card header with title and actions
const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SongTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  color: ${({ variant }) =>
    variant === 'delete' ? '#ef4444' : '#6b7280'};

  &:hover {
    background: ${({ variant }) =>
    variant === 'delete' ? '#fee2e2' : '#f3f4f6'};
    color: ${({ variant }) =>
    variant === 'delete' ? '#dc2626' : '#3b82f6'};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

// Metadata rows
const MetadataRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #4b5563;
  font-size: 0.95rem;
  border-bottom: 1px solid #f3f4f6;

  &:last-of-type {
    border-bottom: none;
  }

  svg {
    color: #9ca3af;
    width: 1.125rem;
    height: 1.125rem;
  }
`;

const MetadataText = styled.span`
  flex: 1;
`;

// Empty state
const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: #f9fafb;
  border-radius: 1rem;
  color: #6b7280;

  svg {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
    color: #9ca3af;
  }

  p {
    font-size: 1.125rem;
    margin: 0.5rem 0 0;
  }
`;

// Loading skeleton
const SkeletonCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
    animation: shimmer 1.5s infinite;
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

interface SongListProps {
  filterBy?: {
    artist?: string;
    album?: string;
    genre?: string;
  };
}

const SongList: React.FC<SongListProps> = ({ filterBy }) => {
  const dispatch = useDispatch();
  const { songs, loading } = useSelector((state: RootState) => state.songs);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  const filteredSongs = songs.filter(song => {
    if (filterBy?.artist && song.artist !== filterBy.artist) return false;
    if (filterBy?.album && song.album !== filterBy.album) return false;
    if (filterBy?.genre && song.genre !== filterBy.genre) return false;
    return true;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSongRequest(id));
    }
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
  };

  const handleCancelEdit = () => {
    setEditingSong(null);
  };

  // Build filter display string
  const getFilterDisplay = () => {
    if (filterBy?.artist) return `Artist: ${filterBy.artist}`;
    if (filterBy?.album) return `Album: ${filterBy.album}`;
    if (filterBy?.genre) return `Genre: ${filterBy.genre}`;
    return null;
  };

  const filterDisplay = getFilterDisplay();

  if (loading && songs.length === 0) {
    // Show skeletons
    return (
      <Container>
        <Header>
          <Title>
            <Music2 size={24} />
            Songs
            {filterDisplay && <FilterBadge>{filterDisplay}</FilterBadge>}
          </Title>
        </Header>
        <SongGrid>
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i}>
              <div style={{ height: '24px', width: '60%', background: '#e5e7eb', borderRadius: '4px', marginBottom: '1rem' }} />
              <div style={{ height: '20px', width: '40%', background: '#e5e7eb', borderRadius: '4px', marginBottom: '0.5rem' }} />
              <div style={{ height: '20px', width: '70%', background: '#e5e7eb', borderRadius: '4px' }} />
            </SkeletonCard>
          ))}
        </SongGrid>
      </Container>
    );
  }

  return (
    <Container>
      {/* Edit form modal (inline) */}
      {editingSong && (
        <div style={{ marginBottom: '2rem' }}>
          <SongForm songToEdit={editingSong} onClose={handleCancelEdit} />
        </div>
      )}

      <Header>
        <Title>
          <Music2 size={24} />
          Songs
          {filterDisplay && <FilterBadge>{filterDisplay}</FilterBadge>}
        </Title>
        <SongCount>
          {filteredSongs.length} {filteredSongs.length === 1 ? 'song' : 'songs'}
        </SongCount>
      </Header>

      {filteredSongs.length === 0 ? (
        <EmptyState>
          <AlertCircle size={64} />
          <p>No songs found</p>
          {filterDisplay && <p>Try adjusting your filter</p>}
        </EmptyState>
      ) : (
        <SongGrid>
          {filteredSongs.map((song) => (
            <SongCard key={song._id}>
              <CardHeader>
                <SongTitle>{song.title}</SongTitle>
                <ActionButtons>
                  <IconButton onClick={() => dispatch(playSong(song))} title="Play song">
                    <Play size={18} />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(song)} title="Edit song">
                    <Edit2 size={18} />
                  </IconButton>
                  <IconButton
                    variant="delete"
                    onClick={() => handleDelete(song._id)}
                    title="Delete song"
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </ActionButtons>
              </CardHeader>

              <MetadataRow>
                <User size={18} />
                <MetadataText>{song.artist}</MetadataText>
              </MetadataRow>

              <MetadataRow>
                <Disc3 size={18} />
                <MetadataText>{song.album}</MetadataText>
              </MetadataRow>

              <MetadataRow>
                <Tag size={18} />
                <MetadataText>{song.genre}</MetadataText>
              </MetadataRow>
            </SongCard>
          ))}
        </SongGrid>
      )}
    </Container>
  );
};

export default SongList;