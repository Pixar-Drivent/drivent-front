import styled from 'styled-components';
import { NoPermission } from '../../../NoPermitionCard';

export function TicketsManager(enrollment, ticketPickerProps) {
  if (enrollment === null) {
    return <NoPermission />;
  } else {
    return TicketPicker(ticketPickerProps);
  }
}

function TicketPicker({ submitPayment, selectedOption, selectModality, accommodation, ticketType }) {
  return (
    <Payments onSubmit={submitPayment}>
      <Container>
        <TextModality isOnScreen={true}> Primeiro, escolha sua modalidade de ingresso </TextModality>
        <Modality>
          <OptionBox
            isSelected={selectedOption === 'presential' ? true : false}
            onClick={() => {
              selectModality('presential');
            }}
          >
            <Option>Presencial</Option>
            <Price>R$ 250,00</Price>
          </OptionBox>
          <OptionBox
            isSelected={selectedOption === 'online' ? true : false}
            onClick={() => {
              selectModality('online');
            }}
          >
            <Option>Online</Option>
            <Price>R$ 100,00</Price>
          </OptionBox>
        </Modality>
      </Container>

      {selectedOption === null ? (
        <div></div>
      ) : selectedOption === 'presential' ? (
        <Container>
          <TextModality isOnScreen={selectedOption === 'presential' ? true : false}>
            {' '}
            Ótimo! Agora escolha sua modalidade de hospedagem{' '}
          </TextModality>
          <Modality>
            <OptionBox
              isSelected={accommodation === 'none' ? true : false}
              onClick={() => {
                selectModality('none');
              }}
            >
              <Option>Sem Hotel</Option>
              <Price>+ R$ 0</Price>
            </OptionBox>
            <OptionBox
              isSelected={accommodation === 'hotel' ? true : false}
              onClick={() => {
                selectModality('hotel');
              }}
            >
              <Option>Com Hotel</Option>
              <Price>+ R$ 350,00</Price>
            </OptionBox>
          </Modality>
          <TextModality isOnScreen={accommodation !== null ? true : false}>
            {' '}
            Fechado! O total ficou em <span> R$ {ticketType.price}</span>. Agora é só confirmar{' '}
          </TextModality>
          <SendButton isOnScreen={accommodation !== null ? true : false} type="submit">
            RESERVAR INGRESSO
          </SendButton>
        </Container>
      ) : (
        <Container>
          <TextModality isOnScreen={selectedOption === 'online' ? true : false}>
            {' '}
            Fechado! O total ficou em <span> R$ {ticketType.price}</span>. Agora é só confirmar{' '}
          </TextModality>
          <SendButton isOnScreen={selectedOption === 'online' ? true : false} type="submit">
            RESERVAR INGRESSO
          </SendButton>
        </Container>
      )}
    </Payments>
  );
}

const Payments = styled.form``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextModality = styled.div`
  font-size: 20px;
  margin-top: 37px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #8e8e8e;
  margin-bottom: 17px;
  display: ${(props) => (props.isOnScreen ? 'inline' : 'none')};
  span {
    font-weight: bold;
  }
`;
const Modality = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const OptionBox = styled.div`
  width: 145px;
  height: 145px;
  border: ${(props) => (props.isSelected ? 'none' : '1px solid #CECECE')};
  border-radius: 20px;
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => (props.isSelected ? '#FFEED2' : 'transparent')};
`;
const Option = styled.div`
  color: #454545;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 3px;
`;
const Price = styled.div`
  color: #898989;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 14px;
`;
const SendButton = styled.button`
  display: ${(props) => (props.isOnScreen ? 'initial' : 'none')};
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 172px;
  height: 37px;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
`;
