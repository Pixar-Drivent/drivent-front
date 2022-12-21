import styled from 'styled-components';

export default function HotelComponent( { obj, model = false, selected = false, selectedHotelIdState = [0, () => { }] } ) {
  if (!obj) return <></>;
  const [selectedHotelId, setSelectedHotelId] = selectedHotelIdState;
  const isSelected = obj.id === selectedHotelId;

  return <Container selected={selected || isSelected} onClick={() => setSelectedHotelId(obj.id)}>
    <img src={obj.image} alt={obj.name} />
    <div>
      <h2>{obj.name}</h2>
      <h3>{model? 'Tipos de acomodação:' : 'Quarto reservado'}</h3>
      <p>{obj.type}</p>
      <h3>{model? 'Vagas disponíveis:' : 'Pessoas no seu quarto'}</h3>
      <p>{obj.vacancy}</p>
    </div>
  </Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 0 0;
  width: 200px;
  height: 260px;
  background:${props => props.selected ? '#FFEED2' : '#EBEBEB'};
  border-radius: 10px;
  font-family: 'Roboto';
  font-style: normal;

  img {
    width: 170px;
    height: 110px;
    border-radius: 5px;
  }
  h2 {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #343434;
    margin-top: 8px;
  }
  h3 {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #3C3C3C;
    margin-top: 13px;
  }
  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #3C3C3C;
    margin-top: 1px;
  }
  div {
    width: 85%;
  }
  &:hover{
        cursor: pointer;
        background-color: white;
        filter: brightness(0.8);
        transition: background-color 200ms, filter 200ms;
  }
  &:active{
      transform: translateY(2px);
  }
`;
