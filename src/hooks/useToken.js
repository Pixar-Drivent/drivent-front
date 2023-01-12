import { useContext } from 'react';

import UserContext from '../contexts/UserContext';

export default function useToken() {
  const { user } = useContext(UserContext);
  console.log('usetoken: ', user);
  return user.token;
}
