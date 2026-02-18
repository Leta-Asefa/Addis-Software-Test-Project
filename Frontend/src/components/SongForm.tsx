import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createSongRequest, updateSongRequest } from '../store/songs/songsSlice';
import styled from '@emotion/styled';
import type { Song } from '../types';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 8px;
  flex: 1 1 200px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

  useEffect(() => {
    if (songToEdit) {
      setFormData({
        title: songToEdit.title,
        artist: songToEdit.artist,
        album: songToEdit.album,
        genre: songToEdit.genre,
      });
    } else {
      setFormData({ title: '', artist: '', album: '', genre: '' });
    }
  }, [songToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (songToEdit) {
      dispatch(updateSongRequest({ id: songToEdit._id, data: formData }));
    } else {
      dispatch(createSongRequest(formData));
    }
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="artist"
        placeholder="Artist"
        value={formData.artist}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="album"
        placeholder="Album"
        value={formData.album}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />
      <Button type="submit">{songToEdit ? 'Update' : 'Add'} Song</Button>
      {songToEdit && <Button type="button" onClick={onClose}>Cancel</Button>}
    </Form>
  );
};

export default SongForm;