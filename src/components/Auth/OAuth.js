import axios from 'axios';
import qs from 'query-string';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
const CLIENT_ID = '9df4cb335377e0ebba70';
const REDIRECT_URL = 'http://localhost:3000/sign-in';

export default function OAuth() {
  const { code } = qs.parseUrl(window.location.href).query;
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  
  if(code) {
    const response = axios.post('http://localhost:4000/auth/github-login', { code });
    response.then((res) => {
      const user =  res.data;
      const serializedUser = JSON.stringify(res.data);
      localStorage.setItem('driventUser', serializedUser);
      setUser(res.data);
      navigate('/dashboard');
    }).catch((err) => {
      console.error(err);
    });
  }

  function redirectToGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URL
    };
    const queryStrings = qs.stringify(params);
    const authUrl = `${GITHUB_URL}?${queryStrings}`;
    window.location.href = authUrl;
  }
  return(<>
    <button onClick={redirectToGitHub}>GITHUB</button>
  </>);
}

