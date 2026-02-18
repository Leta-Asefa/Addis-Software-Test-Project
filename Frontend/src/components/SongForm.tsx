import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createSongRequest, updateSongRequest } from '../store/songs/songsSlice';
import styled from '@emotion/styled';
import { Music2, User, Disc3, Tag, Plus, Check, X, Upload, Loader2 } from 'lucide-react';
import axios from 'axios';
import type { Song } from '../types';
import { keyframes } from '@emotion/react';
// Styled components (extended for file input)
const FormCard = styled.form`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.02);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #3b82f6;
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #9ca3af;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.2s;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const FileInputWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const FileLabel = styled.label<{ hasFile: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: ${({ hasFile }) => (hasFile ? '#e0f2fe' : '#f9fafb')};
  border: 2px dashed ${({ hasFile }) => (hasFile ? '#3b82f6' : '#e5e7eb')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    border-color: #3b82f6;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileName = styled.span`
  font-size: 0.95rem;
  color: #4b5563;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UploadStatus = styled.div<{ error?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${({ error }) => (error ? '#ef4444' : '#6b7280')};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary'; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.15s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  ${({ variant = 'primary' }) =>
    variant === 'primary'
      ? `
    background: #3b82f6;
    color: white;
    &:hover:not(:disabled) {
      background: #2563eb;
      transform: translateY(-1px);
      box-shadow: 0 6px 12px rgba(59, 130, 246, 0.25);
    }
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `
      : `
    background: #f3f4f6;
    color: #4b5563;
    &:hover:not(:disabled) {
      background: #e5e7eb;
    }
  `}
`;


const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinningIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

interface Props {
  songToEdit: Song | null;
  onClose: () => void;
}

const SongForm: React.FC<Props> = ({ songToEdit, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Reset form when editing song changes
  useEffect(() => {
    if (songToEdit) {
      setFormData({
        title: songToEdit.title,
        artist: songToEdit.artist,
        album: songToEdit.album,
        genre: songToEdit.genre,
      });
      // No file selected by default when editing
      setFile(null);
    } else {
      setFormData({ title: '', artist: '', album: '', genre: '' });
      setFile(null);
    }
    setUploadError(null);
  }, [songToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Basic validation: audio file types
      if (!selectedFile.type.startsWith('audio/')) {
        setUploadError('Please select an audio file');
        return;
      }
      setFile(selectedFile);
      setUploadError(null);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
console.log('Cloudinary Config:', { cloudName, uploadPreset }); // Debug log
    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration missing');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          // Could show progress bar if desired
        },
      }
    );
    return response.data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // For create mode, require a file
    if (!songToEdit && !file) {
      setUploadError('Please select an audio file');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      let url: string;

      if (file) {
        // Upload new file
        url = await uploadToCloudinary(file);
      } else if (songToEdit) {
        // Keep existing URL when editing and no new file
        url = songToEdit.url;
      } else {
        // Should not happen due to validation above
        throw new Error('No file selected');
      }

      const data = { ...formData, url };

      if (songToEdit) {
        dispatch(updateSongRequest({ id: songToEdit._id, data }));
      } else {
        dispatch(createSongRequest(data));
      }

      onClose(); // Close form only after success
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError('Failed to upload audio. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const isEditing = !!songToEdit;

  return (
    <FormCard onSubmit={handleSubmit}>
      <Title>
        {isEditing ? <Check size={20} /> : <Plus size={20} />}
        {isEditing ? 'Edit Song' : 'Add New Song'}
      </Title>

      <InputGrid>
        <InputWrapper>
          <StyledIcon>
            <Music2 size={18} />
          </StyledIcon>
          <StyledInput
            type="text"
            name="title"
            placeholder="Song title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <StyledIcon>
            <User size={18} />
          </StyledIcon>
          <StyledInput
            type="text"
            name="artist"
            placeholder="Artist name"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <StyledIcon>
            <Disc3 size={18} />
          </StyledIcon>
          <StyledInput
            type="text"
            name="album"
            placeholder="Album name"
            value={formData.album}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <StyledIcon>
            <Tag size={18} />
          </StyledIcon>
          <StyledInput
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </InputWrapper>
      </InputGrid>

      <FileInputWrapper>
        <HiddenInput
          type="file"
          id="audio-upload"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <FileLabel htmlFor="audio-upload" hasFile={!!file}>
          <Upload size={20} color={file ? '#3b82f6' : '#6b7280'} />
          <FileName>{file ? file.name : 'Choose audio file...'}</FileName>
        </FileLabel>
        {uploading && (
          <UploadStatus>
          <SpinningIcon size={18} />
            Uploading...
          </UploadStatus>
        )}
        {uploadError && <UploadStatus error>{uploadError}</UploadStatus>}
      </FileInputWrapper>

      <ButtonGroup>
        <Button variant="primary" type="submit" disabled={uploading}>
          {uploading ? <SpinningIcon size={18} /> : isEditing ? <Check size={18} /> : <Plus size={18} />}
          {uploading ? 'Uploading...' : isEditing ? 'Update Song' : 'Add Song'}
        </Button>
        {isEditing && (
          <Button variant="secondary" type="button" onClick={onClose} disabled={uploading}>
            <X size={18} />
            Cancel
          </Button>
        )}
      </ButtonGroup>
    </FormCard>
  );
};

export default SongForm;