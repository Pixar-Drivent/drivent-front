import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RenderHeader } from '../../../components/Dashboard/Header/header';
import { RenderSection } from '../../../components/Dashboard/Section/Section';
import useToken from '../../../hooks/useToken';
import { fetchTicketInfo } from '../../../services/paymentApi';

//Renders the activities page
export function Activities() {
  const [redirect, setRedirect] = useState({ navigate: false });
  const token = useToken();
  const navigate = useNavigate();

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    await findTicketInfo(setRedirect, token);
  }, []);

  useEffect(() => {
    handleRedirect(redirect, navigate);
  }, [redirect]);

  //Use the div to build activities page
  return (
    <>
      {RenderHeader({ text: 'Escolha de atividades' })}
      <div>Em breve...</div>
    </>
  );
}

//Renders the error page for when the user is not allowed to pick activities
export function ActivitiesUnauthorized() {
  const [ticketInfo, setTicketInfo] = useState({});
  const token = useToken();

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    const response = await fetchTicketInfo(token);
    setTicketInfo(response);
  }, []);

  return (
    <>
      {RenderHeader({ text: 'Escolha de atividades' })}
      {RenderSection({ text: '', page: 'unauthorized', renderObject: { ticketInfo } })}
    </>
  );
}

async function findTicketInfo(setRedirect, token) {
  const response = await fetchTicketInfo(token);

  if (!response || !response.status) {
    setRedirect({ navigate: 'unauthorized' });
    return;
  }
  if (response.status === 'RESERVED') {
    setRedirect({ navigate: 'unfinished' }); //Please finish paying for your ticket
    return;
  }
  if (response.TicketType.isRemote) {
    setRedirect({ navigate: 'online' }); //Your ticket is Online, you don't need to choose
    return;
  }
  return;
}

function handleRedirect(redirect, navigate) {
  if (redirect.navigate) {
    if (redirect.navigate === 'unauthorized') {
      navigate('/dashboard/activities-unauthorized');
    }
    if (redirect.navigate === 'online') {
      navigate('/dashboard/activities-unauthorized');
    }
    if (redirect.navigate === 'unfinished') {
      navigate('/dashboard/activities-unauthorized');
    }
  }
}
