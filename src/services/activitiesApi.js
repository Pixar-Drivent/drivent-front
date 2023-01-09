import api from './api';

export async function getActivities(token, setDays) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setDays(res.data);
  });

  return response;
}

export async function getUserActivities(token, setActivities) {
  const response = await api.get('/activities/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setActivities(res.data);
  });
  return response;
}

export async function insertActivity(token, activityId) {
  const body = {
    activityId: activityId
  };
  const response = await api
    .post('/activities', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .catch((err) => {
      return err.toJSON();
    });

  return response;
}

export async function deleteActivity(token, activityId) {
  const response = await api
    .delete('/activities', {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
      data: {
        activityId: activityId
      }
    })
    .catch((err) => {
      return err.toJSON();
    });

  return response.data;
}
