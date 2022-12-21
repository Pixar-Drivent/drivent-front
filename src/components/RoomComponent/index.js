import { StyledRoomCard, StyledRoomCapacityContainer } from './style';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

function BedAvailabilityIcon({ available, selected }) {
  if (selected) return <BsPersonFill color={'#FF4791'} />;
  if (available) return <BsPerson />;
  return <BsPersonFill />;
}

export function RoomCard({ room, selectedRoomState }) {
  const { id, name, capacity, Booking } = room;
  const [selectedRoom, setSelectedRoom] = selectedRoomState;
  const isFull = capacity === Booking.length;
  const isSelected = id === selectedRoom;

  function handleSelectRoom(id, isFull) {
    if (isFull) return;
    setSelectedRoom(id);
  }

  function bedsStatus() {
    const beds = [];
    for (let i = 1; i <= capacity; i++) {
      if (isSelected && i === capacity - Booking.length) {
        beds.push(<BedAvailabilityIcon key={i} selected={true}/>);
        continue;
      }
      if (capacity >= Booking.length + i) {
        beds.push(<BedAvailabilityIcon key={i} available={true}/>);
      } else {
        beds.push(<BedAvailabilityIcon key={i} available={false}/>);
      };
    };
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
