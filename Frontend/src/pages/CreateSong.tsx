import SongForm from '../components/SongForm';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
`;

const CreateSong = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/songs');
  };

  return (
    <Container>
      <h1>Create New Song</h1>
      <SongForm songToEdit={null} onClose={handleClose} />
    </Container>
  );
};

export default CreateSong;