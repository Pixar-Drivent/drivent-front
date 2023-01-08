import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RenderHeader } from '../../../components/Dashboard/Header/header';
import { RenderSection } from '../../../components/Dashboard/Section/Section';
import useToken from '../../../hooks/useToken';
import { fetchTicketInfo } from '../../../services/paymentApi';
import { Container, Day, Local, Event } from './style';
import { ImEnter, ImCancelCircle } from 'react-icons/im';
import { BiCheckCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { deleteActivity, getActivities, getUserActivities, insertActivity } from '../../../services/activitiesApi';

//Renders the activities page
export function Activities() {
  const [update, setUpdate] = useState(false); 
  const [redirect, setRedirect] = useState({ navigate: false });
  const [daySelected, setDaySelected] = useState(null);
  const [activities, setActivities] = useState([]); //colocar array vazio
  const [days, setDays] = useState([]);
  const token = useToken();
  const navigate = useNavigate();
  
  //Legacy code: mocked activities
  const daysMock = [
    {
      name: 'segunda',
      date: '22/10',
      locals: [
        {
          name: 'Auditório Principal',
          events: [
            {
              id: 6,
              title: 'Minecraft',
              time: '10:00 - 11:30',
              duration: 1.5,
              vacancy: 0
            },
            {
              id: 3,
              title: 'Minecraft',
              time: '10:00 - 12:00',
              duration: 2,
              vacancy: 0
            }
          ]
        },
        {
          name: 'Auditório Lateral',
          events: [
            {
              id: 1,
              title: 'Minecraft',
              time: '10:00 - 11:00',
              duration: 1,
              vacancy: 1
            },
            {
              id: 4,
              title: 'Minecraft',
              time: '10:00 - 11:00',
              duration: 1,
              vacancy: 2
            },
            {
              id: 5,
              title: 'Minecraft',
              time: '10:00 - 11:30',
              duration: 1.5,
              vacancy: 3
            }
          ]
        },
        {
          name: 'Sala de Workshop'
        }
      ]
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
  useEffect(async () => {
    await findTicketInfo(setRedirect, token);
  }, []); 

  useEffect(() => {
    handleRedirect(redirect, navigate);
  }, [redirect]); 

  //Fetch "days" + "daily activities":
  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    await getActivities(token, setDays);
    await getUserActivities(token, setActivities);
  }, [update]);

  //Use the div to build activities page
  return (
    <>
      {RenderHeader({ text: 'Escolha de atividades' })}

      <Container>
        <div>
          {days.map( (e, i) => <Day onClick={() => setDaySelected(i)} key={i} selected={daySelected===i ? true : false} >{e.name + ', ' + e.date}</Day>)}
        </div>
        <div>{daySelected !== null? renderActivityByDay(days[daySelected], activities, setUpdate, token, update) : ''}</div>        
      </Container>
    </>
  );
}

function renderActivityByDay(day, activities, setUpdate, token, update) {
  return <>
    {day.locals? day.locals.map( (e, i) => {
      return <Local key={i}>
        <div>{e.name}</div>
        <div>
          {e.events? e.events.map( (ele, ind) => {
            return <Event selected={activities.includes(ele.id)? true : false} vacancy={ele.vacancy} hour={ele.duration} key={ind}>
              <div>
                <h2>{ele.title}</h2>
                <p>{ele.time}</p>
              </div>  
              <div onClick={() => selectActivity(ele, activities, token, setUpdate, update)}>
                {activities.includes(ele.id)? 
                  <>
                    <BiCheckCircle />
                    <p>Inscrito</p>
                  </> 
                  : 
                  ele.vacancy > 0? <>
                    <ImEnter />
                    <p>{ele.vacancy} {ele.vacancy > 1? 'vagas' : 'vaga'}</p>
                  </> 
                    :
                    <>
                      <ImCancelCircle />
                      <p>Esgotado</p>
                    </>
                }
              </div>       
            </Event>;
          }) : ''}
        </div>
      </Local>;
    }) : ''}
  </>;
}

async function selectActivity(activity, arrayActivitiesIds, token, setUpdate, update) {
  //If activity has been selected, just remove said activity
  if (arrayActivitiesIds.includes(activity.id)) {
    await deleteActivity(token, activity.id);
    setUpdate(!update);
    toast(toastMessages.remove.text);
  } else {
    //can i select this activity?
    const statusSelect = toastMessages[verifyCanChoose(activity)];

    if (statusSelect.valid) { 
      await insertActivity(token, activity.id);
      setUpdate(!update);
      toast(statusSelect.text);
    } else {
      toast(statusSelect.text); //Nothing happens
    }
  }
  return;
}

function verifyCanChoose(activity) {
  if (activity.vacancy === 0) {
    return 'noVacancy';
  }
  return 'insert';
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

const toastMessages = {
  conflict: {
    text: 'Não foi possível selecionar a atividade devido a um conflito de horário',
    valid: false
  }, 
  remove: {
    text: 'Atividade removida com sucesso',
    valid: true
  }, 
  noVacancy: {
    text: 'Atividade sem vagas',
    valid: false,
  },
  insert: {
    text: 'Atividade escolhida com sucesso',
    valid: true
  }
};
