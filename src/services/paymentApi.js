import api from './api';

export async function fetchPayment(token, ticketId) {
  const response = await api.get('/payments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ticketId: ticketId,
    },
  });

  return response.data;
}

export async function newPayment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function fetchTicketInfo(token) {
  const response = await api
    .get('/tickets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.toJSON();
    });

  return response.data;
}

export async function reserveTicket(body, token) {
  const response = await api.post('/tickets/reserve', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
