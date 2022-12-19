import { useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useEnrollment from '../../../../hooks/api/useEnrollment';
import useToken from '../../../../hooks/useToken';
import { newPayment } from '../../../../services/paymentApi';
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
        <h1>{location + hotel}</h1>
        <h2>{'R$' + price}</h2>
      </TicketContainer>
    </>
  );
}

export function RenderPaymentInfo(renderObject) {
  const token = useToken();
  const navigate = useNavigate();
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
  const [ableToClick, setAbleToClick] = useState(true);

  useEffect(() => {
    setValidToSend(verifyData(paymentInfo));
  }, [paymentInfo]);

  return (
    <>
      <RenderCard alterValue={[setPaymentInfo, paymentInfo]} />
      <ButtomContainer
        isValid={validToSend}
        onClick={() => {
          if (ableToClick) {
            if (validToSend) {
              setAbleToClick(false);
              handleSubmit(paymentInfo, renderObject, token, navigate);
            }
          }
        }}
      >
        FINALIZAR PAGAMENTO
      </ButtomContainer>
    </>
  );
}

export function RenderConfirmation() {
  return (
    <Container>
      <IconContainer>
        <AiFillCheckCircle />
      </IconContainer>
      <TextContainer>
        <h1>Pagamento confirmado!</h1>
        <div>Prossiga para escolha de hospedagem e atividades</div>
      </TextContainer>
    </Container>
  );
}

async function handleSubmit(paymentInfo, { ticketInfo }, token, navigate) {
  const body = {
    ticketId: ticketInfo.id,
    cardData: {
      issuer: paymentInfo.issuer,
      number: +paymentInfo.number.split(' ').join(''),
      name: paymentInfo.name,
      expirationDate: '12/32',
      cvv: +paymentInfo.cvc,
    },
  };

  await newPayment(body, token);
  navigate('/dashboard/payment-info');
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
  if (paymentInfo.issuer.length <= 1) {
    return false;
  }
  return true;
}

const Container = styled.div`
  margin: 15px 0 0 0;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const IconContainer = styled.div`
  height: 42px;
  width: 42px;
  font-size: 40px;

  color: #36b853;
`;

const TextContainer = styled.div`
  margin: 0 0 0 10px;

  font-family: 'Roboto', arial;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #454545;

  h1 {
  }

  div {
    margin: 2px 0 0 0;
    font-weight: 400;
  }
`;

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
  font-family: 'Roboto', arial;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  color: #454545;

  h1 {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    margin: 10px 0 10px 0;
  }
  h2 {
    font-size: 15px;
    line-height: 16px;
    color: #898989;
  }
`;
