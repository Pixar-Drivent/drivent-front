import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RenderHeader } from '../../../components/Dashboard/Header/header';
import HotelComponent from '../../../components/HotelComponent';
import useToken from '../../../hooks/useToken';
import { findHotels } from '../../../services/hotelApi';

export default function HotelI() {
  const token = useToken(); 
  const [hotels, setHotels] = useState([]);

  useEffect(async() => {
    getHotels(setHotels, token);
  }, []); 

  return <> 
    {RenderHeader({ text: 'Escolha de hotel e quarto' })}
    {hotels === undefined? 
      <ErrorMsg> <div>Você precisa ter confirmado pagamento antes
      de fazer a escolha de hospedagem</div> </ErrorMsg> : 
      hotels.length === 0?
        <ErrorMsg> <div>Sua modalidade de ingresso não inclui hospedagem
        Prossiga para a escolha de atividades</div> </ErrorMsg> :
        <Container>
          <h1>Primeiro, escolha seu hotel</h1>
          <div>
            {hotels.map( (e, i) => <HotelComponent key={i} obj={e} model={true} />)}
          </div>
        </Container>}
  </>; 
}

async function getHotels(setHotels, token) {
  const response = await findHotels(token);

  if (response.status === 200) {
    setHotels(response.data);
    response.message = 'OK';
  }
  if (!response || !response.status) {
    setHotels(undefined);
  }
  if (response.message.includes('410')) {
    setHotels([]);
  }
}

const Container = styled.div`
  width: 100%;
  min-height: 80%;

  & > h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
    margin-top: 40px;
  }

  & > div {
    display: flex;
  }
`;

const ErrorMsg = styled.div`
  width: 100%;
  min-height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 464px;
    height: 46px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8E8E8E;
  }
`;
