import { Typography } from '@material-ui/core';
import axios from 'axios';
import qs from 'query-string';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoWrapper } from '.';
import UserContext from '../../contexts/UserContext';
import { githubAuth } from '../../utils/authUtils';

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

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
      client_id: clientId,
      redirect_uri: redirectUrl,
    };
    const queryStrings = qs.stringify(params);
    const authUrl = `${GITHUB_URL}?${queryStrings}`;
    window.location.href = authUrl;
  }
  return(
    <div onClick={redirectToGitHub}>
      <LogoWrapper><img src={githubAuth.logo} alt='logo'></img></LogoWrapper>
      <Typography variant='body2'>{githubAuth.name}</Typography>
    </div>
  );
}
