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

  return response;
}

export async function findHotelById(token, hotelId) {
  const response = await api
    .get(`/hotels/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .catch((err) => {
      return err.toJSON();
    });

  return response.data;
}
