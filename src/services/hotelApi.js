import api from './api';

export async function findHotels(token) {
  const response = await api
    .get('/hotels', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .catch((err) => {
      return err.toJSON();
    });

  return response.data;
}
