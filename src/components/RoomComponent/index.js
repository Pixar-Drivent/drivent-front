import { StyledRoomCard, StyledRoomCapacityContainer } from './style';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

function BedAvailabilityIcon({ available, selected }) {
  if (selected) return <BsPersonFill color={'#FF4791'} />;
  if (available) return <BsPerson />;
  return <BsPersonFill />;
}

export function RoomCard({ room, selectedRoomState, reservationInfo }) {
  const { id, name, capacity, Booking } = room;
  const [selectedRoom, setSelectedRoom] = selectedRoomState;
  const occupancy = Booking.length;

  const isFull = capacity === occupancy;
  const isSelected = id === selectedRoom;
  const isReserved = id === reservationInfo?.Room.id;

  function handleSelectRoom(id, isFull) {
    if (isFull) return;
    setSelectedRoom(id);
  }
  
  function bedsStatus() {
    const beds = [];
    for (let i = capacity; i >= 1; i--) {
      let status = 0;

      if (i <= occupancy) status = 1;
      if (isSelected && !isReserved && i === occupancy + 1) status = 2;
      if (isSelected && isReserved && i === occupancy) status = 2;
      
      if (status === 0) beds.push(<BedAvailabilityIcon key={i} available={true}/>);
      if (status === 1) beds.push(<BedAvailabilityIcon key={i} available={false}/>);
      if (status === 2) beds.push(<BedAvailabilityIcon key={i} selected={true}/>);
    }
    return beds;
  }

  return (
    <StyledRoomCard isFull={isFull} isSelected={isSelected} onClick={() => handleSelectRoom(id, isFull)}>
      <h3>{ name }</h3>
      <StyledRoomCapacityContainer>
        {bedsStatus().map(bed => bed)}
      </StyledRoomCapacityContainer>
    </StyledRoomCard>
  );
}
