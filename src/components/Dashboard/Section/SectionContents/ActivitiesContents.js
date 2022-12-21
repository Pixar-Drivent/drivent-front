import styled from 'styled-components';

export function RenderUnauthorizedPage({ ticketInfo }) {
  const ticketStatus = ticketInfo?.status;
  const isOnline = ticketInfo?.TicketType?.isRemote;

  const errorText = decideText(ticketStatus, isOnline);

  return (
    <Container>
      <ErrorMessage>{errorText}</ErrorMessage>
    </Container>
  );
}

function decideText(ticketStatus, isOnline) {
  if (ticketStatus !== 'PAID') {
    return 'Você precisa ter confirmado pagamento antes de fazer a escolha de atividades';
  }
  if (isOnline) {
    return 'Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.';
  }
}

const Container = styled.div`
  margin-top: 25%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  width: 500px;
  height: 50px;

  font-family: 'Roboto', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #8e8e8e;
`;
