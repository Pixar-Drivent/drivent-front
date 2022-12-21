import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { RenderHeader } from '../../../components/Dashboard/Header/header';
import HotelComponent from '../../../components/HotelComponent';
import useToken from '../../../hooks/useToken';
import { findHotels, findHotelById } from '../../../services/hotelApi';

import { ButtomContainer, StyledRoomsContainer, Container, ErrorMsg } from './style';
import { RoomCard } from '../../../components/RoomComponent';
import { newBooking, updateBooking, userBooking } from '../../../services/bookingApi';

export default function Hotel() {
  const token = useToken();

  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(-1);
  const [selectedHotelObj, setSelectedHotelObj] = useState(null);

  const [selectedRoom, setSelectedRoom] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [reservationInfo, setReservationInfo] = useState(null);
  const [reservedHotel, setReservedHotel] = useState(null);
  
  useEffect(async() => {
    getHotels(setHotels, token);
  }, [loading]); 

  useEffect(async() => {
    getReservationInfo(setReservationInfo, setReservedHotel, setSelectedHotelId, token);
  }, [loading]);

  useEffect(async() => {
    if (selectedHotelId === -1) return;
    getSelectedHotelRooms(findHotelById, setSelectedHotelObj, selectedHotelId, token);
  }, [selectedHotelId, loading]);

  async function handleReservation() {
    setLoading(true);
    
    const body = { roomId: selectedRoom };

    try {
      const bookingInfo = await userBooking(token);
      await updateBooking(bookingInfo.id, body, token);
      toast('Reserva atualizada com sucesso!');
      setLoading(false);
      return;
    } catch (error) {
      if (!error.message.includes('404')) {
        toast('Erro no carregamento da página!');
        return;
      };
    }

    try {
      await newBooking(body, token);
      toast('Reserva realizada com sucesso!');
    } catch (error) {
      let message = 'Não foi possível concluir a reserva!';
      if (error.message.includes('403')) message = 'Quarto sem vagas disponíveis!';
      if (error.message.includes('404')) message = 'Quarto não encontrado!';
      toast(message);
    }

    setLoading(false);
  }

  async function handleChangeRoom() {
    setLoading(true);
    setReservedHotel(null);
    setSelectedRoom(reservationInfo.Room.id);
    setLoading(false);
  }

  function RenderRoomList() {
    return (
      <StyledRoomsContainer>
        <h1>Ótima pedida! Agora escolha seu quarto:</h1>
        {
          selectedHotelObj?
            <div>
              {selectedHotelObj.Rooms.map((room, index) => <RoomCard key={index} room={room} selectedRoomState={[selectedRoom, setSelectedRoom]}/>)}
            </div>
            :
            <>Carregando</>
        }

        <ButtomContainer
          disabled={loading}
          onClick={handleReservation}
        >
          RESERVAR QUARTO
        </ButtomContainer>
      </StyledRoomsContainer>
    );
  }

  function RenderReservation() {
    const hotelObj = hotels.filter(hotel => hotel.id === reservedHotel.id)[0];

    return (
      <>
        <HotelComponent obj={hotelObj} selected={true}/>
        <ButtomContainer
          disabled={loading}
          onClick={handleChangeRoom}
        >
          TROCAR DE QUARTO
        </ButtomContainer>
      </>

    );
  }

  return (
    <>
      {RenderHeader({ text: 'Escolha de hotel e quarto' })}

      {hotels === undefined? 
        <ErrorMsg> <div>Você precisa ter confirmado pagamento antes
        de fazer a escolha de hospedagem</div> </ErrorMsg>
        : 
        hotels.length === 0?
          <ErrorMsg> <div>Sua modalidade de ingresso não inclui hospedagem
          Prossiga para a escolha de atividades</div> </ErrorMsg>
          :
          reservationInfo === null || reservedHotel === null?
            <Container>
              <h1>Primeiro, escolha seu hotel</h1>
              <div>
                {hotels.map( (e, i) => <HotelComponent key={i} obj={e} model={true} selectedHotelIdState={[selectedHotelId, setSelectedHotelId]}/>)}
              </div>
            </Container>
            :
            <></>
      }

      {selectedHotelId === -1?
        <></>
        :
        reservationInfo === null || reservedHotel === null?
          <RenderRoomList />
          :
          <RenderReservation />
      }
    </>
  );
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

async function getReservationInfo(setReservationInfo, setReservedHotel, setSelectedHotelId, token) {
  try {
    const bookingInfo = await userBooking(token);
    setReservationInfo(bookingInfo);

    const hotelInfo = await findHotelById(token, bookingInfo.Room.hotelId);
    setReservedHotel(hotelInfo);
    setSelectedHotelId(bookingInfo.Room.hotelId);
  } catch (error) {
    if (error.message.includes('404')) return;
    toast('Não foi possível verificar a reserva!');
  }
}

async function getSelectedHotelRooms(findHotelById, setSelectedHotelObj, hotelId, token) {
  try {
    const hotelInfo = await findHotelById(token, hotelId);
    setSelectedHotelObj(hotelInfo);
  } catch (error) {
    if (error.message.includes('404')) return;
    toast('Não foi possível verificar a reserva!');
  }
}
