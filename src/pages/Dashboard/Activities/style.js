import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    margin-top: 25px;
  }
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 130px;
  height: 40px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background: ${props => props.selected ? '#FFD37D' : '#E0E0E0'};
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  margin-right: 15px;
`;

const Local = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 33%;
  margin-top: 20px;

  & > div:first-child {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #7B7B7B;
  }

  & > div:last-child {
    border: 1px solid #D7D7D7;
    width: 100%;
    min-height: 350px;
    margin-top: 10px;
  }
`;

const Event = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export {
  Container,
  Day,
  Local,
  Event
};
