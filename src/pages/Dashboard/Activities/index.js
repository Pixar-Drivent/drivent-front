import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RenderHeader } from '../../../components/Dashboard/Header/header';
import { RenderSection } from '../../../components/Dashboard/Section/Section';
import useToken from '../../../hooks/useToken';
import { fetchTicketInfo } from '../../../services/paymentApi';
import { Container, Day } from './style';

//Renders the activities page
export function Activities() {
  const [redirect, setRedirect] = useState({ navigate: false });
  const [daySelected, setDaySelected] = useState(null);
  const token = useToken();
  const navigate = useNavigate();

  const days = [
    {
      name: 'segunda',
      date: '22/10'
    },
    {
      name: 'terça',
      date: '23/10'
    },
    {
      name: 'quarta',
      date: '24/10'
    }
  ];

  // eslint-disable-next-line space-before-function-paren
  /* useEffect(async () => {
    await findTicketInfo(setRedirect, token);
  }, []); */

  /* useEffect(() => {
    handleRedirect(redirect, navigate);
  }, [redirect]); */

  //Use the div to build activities page
  return (
    <>
      {RenderHeader({ text: 'Escolha de atividades' })}

      <Container>
        <div>
          {days.map( (e, i) => <Day onClick={() => setDaySelected(i)} key={i} selected={daySelected===i ? true : false} >{e.name + ', ' + e.date}</Day>)}
        </div>
        <div>{daySelected !== null? renderActivityByDay(days[daySelected]) : ''}</div>        
      </Container>
    </>
  );
}

function renderActivityByDay(day) {
  return <>
    {day.name}
  </>;
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
