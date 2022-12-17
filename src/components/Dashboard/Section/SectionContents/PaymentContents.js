import { useState } from 'react';
import styled from 'styled-components';
import RenderCard from '../../../CardComponent/CardClass';

export function RenderTicket() {
  return <TicketInfoContainer>Tipo de ticket</TicketInfoContainer>;
}

export function RenderPaymentInfo() {
  const [paymentInfo, setPaymentInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  });

  return (
    <>
      <RenderCard alterValue={[setPaymentInfo, paymentInfo]} />
      <div onClick={() => console.log('Card info: ', paymentInfo)}>Finalizar pagamento</div>
    </>
  );
}

const TicketInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 300px;
  height: 110px;

  background: #ffeed2;
  border-radius: 20px;

  margin: 15px 0 0 0;
`;
