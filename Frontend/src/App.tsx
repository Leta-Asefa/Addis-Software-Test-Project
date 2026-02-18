import { Provider } from 'react-redux';
import store from './store/store';
import SongList from './components/SongList';
import StatsDashboard from './components/StatsDashboard';
import styled from '@emotion/styled';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <h1>🎵 Song Management</h1>
        <StatsDashboard />
        <SongList />
      </AppContainer>
    </Provider>
  );
}

export default App;