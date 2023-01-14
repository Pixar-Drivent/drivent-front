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

//Will redirect to stripe url given by the back-end
export async function newPayment(token, ticketId) {
  await api.post('/payments/process', { ticketId: ticketId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    window.location.href = res.data.url; 
  });
}

export async function fetchTicketInfo(token, setTicketInfo) {
  let errorResponse;
  const response = await api
    .get('/tickets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => errorResponse = true);

  if (errorResponse) {
    return false;
  }

  if (response.data && setTicketInfo) {
    setTicketInfo(response.data);
  }

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

export async function verifyPayment(token) {
  let returnBool = false;
  const response = await api.get('/payments/verify', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => returnBool = res.data.paid).catch((err) => returnBool = false); 

  return returnBool; 
}
