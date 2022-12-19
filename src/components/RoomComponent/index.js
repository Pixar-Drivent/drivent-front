import { StyledRoomCard, StyledRoomCapacityContainer } from './style';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

function BedAvailabilityIcon({ available, selected }) {
  if (selected) return <BsPersonFill color={'red'} />;
  if (available) return <BsPerson />;
  return <BsPersonFill />;
}

export function RoomCard({ room }) {
  const { name, capacity, Booking } = room;
  const beds = [<BedAvailabilityIcon key={-1} available={true}/>];

  for (let i = 1; i <= capacity; i++) {
    if (capacity >= Booking + i) {
      beds.push(<BedAvailabilityIcon key={i} available={true}/>);
    } else {
      beds.push(<BedAvailabilityIcon key={i} available={false}/>);
    }
  };

  return (
    <StyledRoomCard full={capacity === Booking}>
      <h3>{ name }</h3>
      <StyledRoomCapacityContainer>
        {beds.map((bed, index) => bed)}
      </StyledRoomCapacityContainer>
    </StyledRoomCard>
  );
}
