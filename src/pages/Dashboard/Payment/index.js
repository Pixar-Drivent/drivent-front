import { useEffect, useState } from 'react';
import { RenderHeader } from '../../../components/Dashboard/Header/header';
import { RenderSection } from '../../../components/Dashboard/Section/Section';
import { fetchPayment, fetchTicketInfo } from '../../../services/paymentApi';

export default function Payment() {
  return RenderPaymnentScreen();
}

export function RenderPaymnentScreen() {
  const [update, setUpdate] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({});
  const userInfo = JSON.parse(localStorage.getItem('userData'));

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    setTicketInfo(await fetchTicketInfo(userInfo.token));
  }, [update]);

  //need: fetch from the API enrollment and payment data
  //if no payment found: render the following
  //require: enrollment done (does not allow to pay)
  //require: payment not done (does not show payment info)

  return (
    <>
      {RenderHeader({ text: 'Ingresso e pagamento' })}
      {RenderSection({ text: 'Ingresso escolhido', page: 'payment', renderObject: { ticketInfo } })}
      {RenderSection({ text: 'Pagamento', page: 'payment' })}
    </>
  );
}
