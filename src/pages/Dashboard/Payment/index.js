import { NoPermitionCard } from '../../../components/NoPermitionCard.js';
import useEnrollment from '../../../hooks/api/useEnrollment.js';
import styled from 'styled-components';
import { useState } from 'react';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [selectedOption, setSelectedOPtion] = useState(null);
  const [accommodation, setAccommodation] = useState(null);
  const [price, setPrice] = useState(100);
  console.log('enrollment: ', enrollment);
  function selectModality(value) {
    if(value==='presential') {
      setSelectedOPtion('presential');
      setPrice(250);
    }
    if(value==='online') {
      setSelectedOPtion('online');
      setPrice(100);
      setAccommodation(null);
    }
    if(value ==='hotel') {
      setAccommodation('hotel');
      setPrice(600);
    }
    if(value ==='none') {
      setAccommodation('none');
      setPrice(250);
    }
  }
  
  function submitPayment(event) {
    event.preventDefault();
    let selectAccommodation = true;
    if(accommodation === 'none' || accommodation === null) {
      selectAccommodation = false;
    }
    const reserveDetails = {
      modality: selectedOption,
      accommodation: selectAccommodation,
      price: price
    };
    console.log('body: ', reserveDetails);
  };
  
  return (
    <>
      {
        enrollment === null ?
          <>
            <TextTittle>Ingresso e Pagamento</TextTittle>
            <NoPermitionCard>
              <div>
                Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
              </div>
            </NoPermitionCard>
          </>
          :
          <Payments onSubmit={submitPayment}>
            <Container>
              <TextTittle>Ingresso e Pagamento</TextTittle>
              <TextModality isOnScreen={true}> Primeiro, escolha sua modalidade de ingresso </TextModality>
              <Modality>
                <OptionBox isSelected={selectedOption==='presential'? true : false} onClick={() => {selectModality('presential');}}>
                  <Option>Presencial</Option>
                  <Price>R$ 250,00</Price>
                </OptionBox>
                <OptionBox isSelected={selectedOption==='online'? true : false} onClick={() => {selectModality('online');}}>
                  <Option>Online</Option>
                  <Price>R$ 100,00</Price>
                </OptionBox>
              </Modality>
            </Container>
          
            {
              selectedOption === null ?
                <div></div>
                :
                selectedOption === 'presential'?
                  <Container>
                    <TextModality isOnScreen={selectedOption === 'presential' ? true : false}> Ótimo! Agora escolha sua modalidade de hospedagem </TextModality>
                    <Modality>
                      <OptionBox isSelected={accommodation==='none'? true : false} onClick={() => {selectModality('none');}}>
                        <Option>Sem Hotel</Option>
                        <Price>+ R$ 0</Price>
                      </OptionBox>
                      <OptionBox isSelected={accommodation==='hotel'? true : false} onClick={() => {selectModality('hotel');}}>
                        <Option>Com Hotel</Option>
                        <Price>+ R$ 350,00</Price>
                      </OptionBox>
                    </Modality>
                    <TextModality isOnScreen={accommodation!==null ? true : false}> Fechado! O total ficou em  <span> R$ {price}</span>. Agora é só confirmar </TextModality>
                    <SendButton isOnScreen={accommodation!==null ? true : false} type='submit'>
                      RESERVAR INGRESSO
                    </SendButton>
                  </Container>
                  :
                  <Container>
                    <TextModality isOnScreen={selectedOption === 'online' ? true : false}> Fechado! O total ficou em  <span> R$ {price}</span>. Agora é só confirmar </TextModality>
                    <SendButton isOnScreen={selectedOption === 'online' ? true : false} type='submit'>
                      RESERVAR INGRESSO
                    </SendButton>
                  </Container>
            }
          </Payments>
      }
    </>
  );
}

const Payments = styled.form`

`;
const TextTittle = styled.div`
    font-family: "Roboto", sans-serif;
    font-size: 34px;
  
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextModality = styled.div`
  font-size: 20px;
  margin-top: 37px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #8E8E8E;
  margin-bottom: 17px;
  display:${ props => props.isOnScreen ? 'inline':'none'};
  span{
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
  border: ${props => props.isSelected ? 'none': '1px solid #CECECE'};
  border-radius: 20px;
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color:${ props => props.isSelected ? '#FFEED2': 'transparent'};
`;
const Option = styled.div`
  color: #454545;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 3px;
`;
const Price = styled.div`
  color: #898989;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-size: 14px;
`;
const SendButton = styled.button`
  display:${ props => props.isOnScreen ? 'initial':'none'};
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 172px;
  height: 37px;
  border: none;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
`;
