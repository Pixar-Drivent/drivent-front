import api from './api';

export async function save(body, token) {
  console.log('token: ', token);
  console.log('body: ', body);
  const response = await api.post('/enrollments', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getPersonalInformations(token) {
  const response = await api.get('/enrollments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
//
