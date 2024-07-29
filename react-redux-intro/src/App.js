import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import { useSelector } from 'react-redux';

function App() {
  const isAuthtenticated = useSelector(state => state.auth.isAuthtenticated);

  return (
    <>
      <Header />
      {isAuthtenticated && <UserProfile />}
      {!isAuthtenticated && <Auth />}

      <Counter />
    </>
  );
}

export default App;
