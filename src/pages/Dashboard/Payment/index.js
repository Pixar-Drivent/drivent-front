import { useEffect, useState } from 'react';
import { RenderHeader } from '../../../components/Dashboard/Header/header';
import { RenderSection } from '../../../components/Dashboard/Section/Section';
import { fetchTicketInfo } from '../../../services/paymentApi';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken';

export function Payment() {
  return RenderPaymnentScreen();
}

//Route: /payment-verification
export function PaymentVerification() {
  const [update, setUpdate] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({});
  const [redirect, setRedirect] = useState({ navigate: false });
  const token = useToken();
  const navigate = useNavigate();

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    await findTicketInfo(setRedirect, token);
  }, []);

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    setTicketInfo(await fetchTicketInfo(token));
  }, [update]);

  useEffect(() => {
    //handleRedirect(redirect, navigate);
  }, [redirect]);

  return (
    <>
      {RenderHeader({ text: 'Ingresso e pagamento' })}
      {RenderSection({ text: 'Ingresso escolhido', page: 'payment', renderObject: { ticketInfo } })}
      {RenderSection({ text: '', page: 'payment-verification', renderObject: { ticketInfo } })}
    </>
  );
}

//Route: /payment-info
export function PaymentInfo() {
  const [update, setUpdate] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({});
  const [redirect, setRedirect] = useState({ navigate: false });
  const token = useToken();
  const navigate = useNavigate();

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    await findTicketInfo(setRedirect, token);
  }, []);

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    setTicketInfo(await fetchTicketInfo(token));
  }, [update]);

  useEffect(() => {
    handleRedirect(redirect, navigate);
  }, [redirect]);

  return (
    <>
      {RenderHeader({ text: 'Ingresso e pagamento' })}
      {RenderSection({ text: 'Ingresso escolhido', page: 'payment', renderObject: { ticketInfo } })}
      {RenderSection({ text: 'Pagamento', page: 'payment-done', renderObject: { ticketInfo } })}
    </>
  );
}

//Route: /payment
export function RenderPaymnentScreen() {
  const [update, setUpdate] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({});
  const [redirect, setRedirect] = useState({ navigate: false });
  const token = useToken();
  const navigate = useNavigate();

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    await findTicketInfo(setRedirect, token);
  }, []);

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    await fetchTicketInfo(token, setTicketInfo);
  }, [update]);

  useEffect(() => {
    handleRedirect(redirect, navigate);
  }, [redirect]);

  return (
    <>
      {RenderHeader({ text: 'Ingresso e pagamento' })}
      {RenderSection({ text: 'Ingresso escolhido', page: 'payment', renderObject: { ticketInfo } })}
      {RenderSection({ text: 'Pagamento', page: 'payment', renderObject: { ticketInfo } })}
    </>
  );
}

async function findTicketInfo(setRedirect, token) {
  const response = await fetchTicketInfo(token);

  if (!response || !response.status) {
    setRedirect({ navigate: 'ticket' });
  }
  if (response.status === 'PAID') {
    setRedirect({ navigate: 'payment-info' });
  }
  if (response.status === 'RESERVED') {
    setRedirect({ navigate: 'payment' });
  }
}

function handleRedirect(redirect, navigate) {
  if (redirect.navigate) {
    if (redirect.navigate === 'payment') {
      navigate('/dashboard/payment');
    }
    if (redirect.navigate === 'payment-info') {
      navigate('/dashboard/payment-info');
    }
    if (redirect.navigate === 'ticket') {
      navigate('/dashboard/ticket');
    }
  }
}
