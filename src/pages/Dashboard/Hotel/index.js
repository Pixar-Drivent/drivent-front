import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ButtomContainer, StyledRoomsContainer } from './style';
import { RoomCard } from '../../../components/RoomComponent';
import useToken from '../../../hooks/useToken';
import { newBooking, updateBooking, userBooking } from '../../../services/bookingApi';
import { BsBook } from 'react-icons/bs';
import { findHotelById } from '../../../services/hotelApi';

export default function Hotel() {
  const [selectedRoom, setSelectedRoom] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [reservationInfo, setReservationInfo] = useState(null);
  const [reservedHotel, setReservedHotel] = useState(null);
  const token = useToken();

  useEffect(async() => {
    try {
      const bookingInfo = await userBooking(token);
      setReservationInfo(bookingInfo);

      const hotelInfo = await findHotelById(token, bookingInfo.Room.hotelId);
      setReservedHotel(hotelInfo);
    } catch (error) {
      if (error.message.includes('404')) return;
      toast('Não foi possível verificar a reserva!');
    }
  }, [loading]);

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
    setReservedHotel(null);
    setSelectedRoom(reservationInfo.Room.id);
  }

  function RenderRoomList() {
    return (
      <StyledRoomsContainer>
        <h1>Ótima pedida! Agora escolha seu quarto:</h1>
        <div>
          {roomsList.map((room, index) => <RoomCard key={index} room={room} selectedRoomState={[selectedRoom, setSelectedRoom]}/>)}
        </div>

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
    return (
      <>
        <div>
          Nome do Hotel: {reservedHotel.name}
          <img width={'100px'} src={reservedHotel.image} alt='Hotel Image'/>
        </div>    
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
      <p>Escolha de hotel e quarto</p>
      <p>Primeiro, escolha seu hotel</p>
      <p>~Lista com os hotéis~</p>

      {reservationInfo === null || reservedHotel === null?
        <RenderRoomList />
        :
        <RenderReservation />
      }
    </>
  );
}

//Dados mochados

const roomsList = [
  {
    id: 1,
    name: '1',
    capacity: 1,
    hotelId: 1,
    Booking: 0,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 2,
    name: '2',
    capacity: 1,
    hotelId: 1,
    Booking: 1,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 3,
    name: '3',
    capacity: 2,
    hotelId: 1,
    Booking: 0,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 4,
    name: '4',
    capacity: 2,
    hotelId: 1,
    Booking: 1,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 5,
    name: '5',
    capacity: 2,
    hotelId: 1,
    Booking: 2,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 6,
    name: '6',
    capacity: 3,
    hotelId: 1,
    Booking: 0,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 7,
    name: '7',
    capacity: 3,
    hotelId: 1,
    Booking: 1,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 8,
    name: '8',
    capacity: 3,
    hotelId: 1,
    Booking: 2,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 9,
    name: '9',
    capacity: 3,
    hotelId: 1,
    Booking: 3,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 10,
    name: '10',
    capacity: 4,
    hotelId: 1,
    Booking: 0,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 11,
    name: '11',
    capacity: 4,
    hotelId: 1,
    Booking: 1,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 12,
    name: '12',
    capacity: 4,
    hotelId: 1,
    Booking: 2,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 13,
    name: '13',
    capacity: 4,
    hotelId: 1,
    Booking: 3,
    createdAt: true,
    updatedAt: true,
  },
  {
    id: 14,
    name: '14',
    capacity: 4,
    hotelId: 1,
    Booking: 4,
    createdAt: true,
    updatedAt: true,
  },
];
