import api from './api';

export async function paymentProcess(body) {
  const response = await api.post('/payments', { body });
  return response.data;
}
//
