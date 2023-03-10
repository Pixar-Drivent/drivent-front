import api from './api';

export async function getActivities(token, setDays) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    const dateASC = res.data.sort(function(a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    setDays(dateASC);
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
  let error;
  const returnObj = {
    err: null,
    res: null
  };

  const response = await api
    .post('/activities', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).catch((err) => { error = err.toJSON(); });

  if (error) {
    returnObj.err = error;
    return returnObj;
  }

  returnObj.res = response;

  return returnObj;
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
