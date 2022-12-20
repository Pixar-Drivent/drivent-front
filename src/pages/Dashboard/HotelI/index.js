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

  console.log(hotels);

  return <> 
    {RenderHeader({ text: 'Escolha de hotel e quarto' })}
    {hotels === undefined? 
      <ErrorMsg> <div>Você precisa ter confirmado pagamento antes
      de fazer a escolha de hospedagem</div> </ErrorMsg> : 
      <HotelComponent />}
  </>; 
}

async function getHotels(setHotels, token) {
  const response = await findHotels(token);

  if (!response || !response.status) {
    setHotels(undefined);
  }
}

const ErrorMsg = styled.div`
  width: 100%;
  height: 90%;
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
