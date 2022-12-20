import { useState } from 'react';
import { toast } from 'react-toastify';

import { ButtomContainer, StyledRoomsContainer } from './style';
import { RoomCard } from '../../../components/RoomComponent';
import useToken from '../../../hooks/useToken';
import { newBooking } from '../../../services/bookingApi';

export default function Hotel() {
  const [selectedRoom, setSelectedRoom] = useState(-1);
  const [loading, setLoading] = useState(false);
  const token = useToken();

  async function handleReservation() {
    setLoading(true);
    
    const body = { roomId: selectedRoom };

    try {
      await newBooking(body, token);
      toast('Reserva realizada com sucesso!');
    } catch (error) {
      toast('Não foi possível fazer a reserva!');
    }

    setLoading(false);
  }

  return (
    <>
      <p>Escolha de hotel e quarto</p>
      <p>Primeiro, escolha seu hotel</p>
      <p>~Lista com os hotéis~</p>

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
