import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RenderCard from '../../../CardComponent/CardClass';

export function RenderTicket(renderObject) {
  return <TicketInfoContainer>{RenderTicketInfo(renderObject)}</TicketInfoContainer>;
}

function RenderTicketInfo(renderObject) {
  const location = renderObject.ticketInfo.TicketType?.isRemote ? 'Online' : 'Presencial';
  const hotel = location === 'Presencial' ? (renderObject.ticketInfo.TicketType?.includesHotel ? ' + Hotel' : '') : '';
  const price = renderObject.ticketInfo.TicketType?.price + '';

  return (
    <>
      <TicketContainer>
        <div>{location + hotel}</div>
        <div>{'R$' + price}</div>
      </TicketContainer>
    </>
  );
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
  const [validToSend, setValidToSend] = useState(verifyData(paymentInfo));

  useEffect(() => {
    setValidToSend(verifyData(paymentInfo));
  }, [paymentInfo]);

  return (
    <>
      <RenderCard alterValue={[setPaymentInfo, paymentInfo]} />
      <ButtomContainer
        isValid={validToSend}
        onClick={() => {
          if (validToSend) {
            handleSubmit(paymentInfo);
          }
        }}
      >
        FINALIZAR PAGAMENTO
      </ButtomContainer>
    </>
  );
}

function handleSubmit(paymentInfo) {
  console.log('Card info: ', paymentInfo);
}

function verifyData(paymentInfo) {
  if (paymentInfo.number.length !== 19) {
    return false;
  }
  if (paymentInfo.name.length <= 1) {
    return false;
  }
  if (paymentInfo.expiry.length !== 5) {
    return false;
  }
  if (paymentInfo.cvc.length !== 3) {
    return false;
  }
  return true;
}

const ButtomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 50px;

  background: ${(props) => (props.isValid ? 'lightgreen' : '#e0e0e0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  font-family: 'Roboto', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #000000;
`;

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

const TicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    margin: 10px 0 10px 0;
  }
`;
