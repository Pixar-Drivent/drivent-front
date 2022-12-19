import { useEffect, useState } from 'react';
import { RenderHeader } from '../../../components/Dashboard/Header/header';
import { fetchTicketInfo, reserveTicket } from '../../../services/paymentApi';
import useEnrollment from '../../../hooks/api/useEnrollment.js';
import { TicketsManager } from '../../../components/Dashboard/Section/SectionContents/TicketContents';
import useToken from '../../../hooks/useToken';
import { useNavigate } from 'react-router-dom';

export default function Ticket() {
  const [selectedTicket, setSelectedTicket] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const token = useToken();
  const navigate = useNavigate();

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    await findTicketInfo(setRedirect, token);
  }, []);

  if (redirect || selectedTicket) {
    navigate('/dashboard/payment');
  }
  return RenderTicketMenu(setSelectedTicket);
}

async function findTicketInfo(setRedirect, token) {
  const response = await fetchTicketInfo(token);
  if (!response.status) {
    setRedirect(false);
  } else {
    setRedirect(true);
  }
}

export function RenderTicketMenu(setSelectedTicket) {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (submitted) {
      setSelectedTicket(true);
    }
  }, [submitted]);

  const [selectedOption, setSelectedOPtion] = useState(null);
  const [accommodation, setAccommodation] = useState(null);
  const [ticketType, setTicketType] = useState({
    name: null,
    price: null,
    isRemote: null,
    includesHotel: null,
  });

  const { enrollment } = useEnrollment();
  const token = useToken();

  function selectModality(value) {
    if (value === 'presential') {
      setSelectedOPtion('presential');
      setTicketType({ ...ticketType, isRemote: false, price: 250 });
    }
    if (value === 'online') {
      setSelectedOPtion('online');
      setAccommodation(null);
      setTicketType({ ...ticketType, isRemote: true, includesHotel: false, price: 100 });
    }
    if (value === 'hotel') {
      setAccommodation('hotel');
      setTicketType({ ...ticketType, isRemote: false, includesHotel: true, price: 600 });
    }
    if (value === 'none') {
      setAccommodation('none');
      setTicketType({ ...ticketType, isRemote: false, includesHotel: false, price: 250 });
    }
  }

  async function submitPayment(event) {
    event.preventDefault();
    setTicketType({ ...ticketType, name: enrollment.name });
    const body = {
      ticketInfo: {
        ...ticketType,
        name: enrollment.name,
      },
    };

    await reserveTicket(body, token);
    setSubmitted(true);
  }

  const ticketPickerProps = {
    submitPayment: submitPayment,
    selectedOption: selectedOption,
    selectModality: selectModality,
    accommodation: accommodation,
    ticketType: ticketType,
  };
  if (!submitted) {
    return (
      <>
        {RenderHeader({ text: 'Ingresso e pagamento' })}
        {TicketsManager(enrollment, ticketPickerProps)}
      </>
    );
  } else {
    return <></>;
  }
}
