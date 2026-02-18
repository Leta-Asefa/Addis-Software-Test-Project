import  { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2 } from 'lucide-react';
import { type RootState } from '../store/rootReducer';
import {
  pauseSong,
  resumeSong,
  setProgress,
  setDuration,
  setVolume,
} from '../store/player/playerSlice';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1f2937;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
`;

const CoverArt = styled.div`
  width: 48px;
  height: 48px;
  background: #4b5563;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongTitle = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

const SongArtist = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ControlButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;

  &:hover {
    background: #374151;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PlayPauseButton = styled(ControlButton)`
  background: #3b82f6;
  &:hover {
    background: #2563eb;
  }
`;

const ProgressBar = styled.input`
  width: 300px;
  height: 4px;
  border-radius: 2px;
  background: #4b5563;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
`;

const VolumeSlider = styled(ProgressBar)`
  width: 80px;
`;

const TimeDisplay = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
  min-width: 40px;
  text-align: center;
`;

const GlobalPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume, progress, duration } = useSelector(
    (state: RootState) => state.player
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [localVolume, setLocalVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      dispatch(setProgress(audio.currentTime));
    };

    const handleDurationChange = () => {
      dispatch(setDuration(audio.duration));
    };

    const handleEnded = () => {
      dispatch(pauseSong());
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [dispatch]);

  // Handle song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error('Playback failed', e));
      }
    }
  }, [currentSong]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error('Playback failed', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : localVolume;
      dispatch(setVolume(localVolume));
    }
  }, [localVolume, isMuted, dispatch]);

  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(pauseSong());
    } else {
      dispatch(resumeSong());
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      dispatch(setProgress(newTime));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentSong) return null;

  return (
    <PlayerContainer>
      <SongInfo>
        <CoverArt>
          <Music2 size={24} />
        </CoverArt>
        <Details>
          <SongTitle>{currentSong.title}</SongTitle>
          <SongArtist>{currentSong.artist}</SongArtist>
        </Details>
      </SongInfo>

      <Controls>
        <ControlButton disabled>
          <SkipBack size={20} />
        </ControlButton>
        <PlayPauseButton onClick={handlePlayPause}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </PlayPauseButton>
        <ControlButton disabled>
          <SkipForward size={20} />
        </ControlButton>
      </Controls>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <TimeDisplay>{formatTime(progress)}</TimeDisplay>
        <ProgressBar
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
        />
        <TimeDisplay>{formatTime(duration)}</TimeDisplay>
      </div>

      <VolumeControl>
        <ControlButton onClick={toggleMute}>
          {isMuted || localVolume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </ControlButton>
        <VolumeSlider
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : localVolume}
          onChange={handleVolumeChange}
        />
      </VolumeControl>
    </PlayerContainer>
  );
};

export default GlobalPlayer;