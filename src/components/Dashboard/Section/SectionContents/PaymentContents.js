import { useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useToken from '../../../../hooks/useToken';
import { fetchTicketInfo, newPayment, verifyPayment } from '../../../../services/paymentApi';
import { toast } from 'react-toastify';
import MoonLoader from 'react-spinners/MoonLoader';

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
  const [valid, setValid] = useState(true);

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    const ticketInfo = await fetchTicketInfo(token);
    if (!ticketInfo) {
      navigate('/dashboard/ticket');
    }

    const response = await fetchTicketInfo(token);

    if (response.status === 'RESERVED') {
      toast('O seu pedido já está reservado! Basta finalizar o pagamento');
    }

    if (response.status === 'PAID') {
      navigate('/dashboard/payment-info');
    }
  }, []);

  return (
    <ButtomsContainer>
      <ButtomContainer
        isValid={valid}
        onClick={() => { redirectToStripe(token, renderObject); setValid(!valid); }}
      >
        FINALIZAR PAGAMENTO
      </ButtomContainer>
    </ButtomsContainer>
  );
}

async function redirectToStripe(token, renderObject) {
  await newPayment(token, renderObject.ticketInfo.id);
}

export function RenderConfirmation() {
  const token = useToken();
  const navigate = useNavigate();

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    const hasPaid = await verifyPayment(token);
    if (hasPaid) {
      toast('O seu pagamento já está em ordem!');
    } else {
      navigate('/dashboard/payment');
    }
  }, []);
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

export function RenderVerification() {
  const token = useToken();
  const navigate = useNavigate();
  const [tries, setTries] = useState(0);
  const [message, setMessage] = useState('Carregando pagamento');
  const frequency = 0.75;
  const [color, setColor] = useState('#'+Math.floor(Math.random()*16777215).toString(16));
  const possibleColors = ['#F1D302', '#161925', '#00B295', '#191516', '#AB2346', '#484349', '#C1292E', '#161925', '#18A999', '#109648', '#'+Math.floor(Math.random()*16777215).toString(16)];
  const colorsArrayLength = possibleColors.length;
  const requestTimer = setInterval(() => {}, 1000);

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    const interval = setInterval(() => {
      setColor(possibleColors[Math.floor(Math.random() * colorsArrayLength)]);
    }, 1500);

    const ticketInfo = await fetchTicketInfo(token);
    if (!ticketInfo) {
      navigate('/dashboard/ticket');
    }

    const hasPaid = await verifyPayment(token);
    if (hasPaid) {
      navigate('/dashboard/payment-info');
    }
  }, [tries]);

  //Sends requests after 10s, updating the number of tries
  if (requestTimer % 10 === 0) {
    setTries(tries+1);
    setMessage(message + '.');
  }

  //after 3 tries it redirects to payment screen
  if (tries > 3) {
    toast('Pagamento não encontrado');
    navigate('/dashboard/payment');
  }

  return (
    <LoadingContainer>
      <div>{message}</div>
      <div>
        <MoonLoader
          color={color}
          size={120}
          aria-label='Loading Spinner'
          data-testid='loader'
          speedMultiplier={frequency}
        />
      </div>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;

  div {
    margin: 25px 0 25px 0;
  }
`;

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

  margin: 20px 40px 20px 0;

  color: #000000;
`;

const ButtomsContainer = styled.div`
  display: flex;
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
