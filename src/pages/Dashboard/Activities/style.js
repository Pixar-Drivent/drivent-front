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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Event = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 230px;
  height: ${props => props.hour ? (80*props.hour + (props.hour-1)*10)+'px' : '80px'};
  background: ${props => props.selected ? '#D0FFDB' : '#F1F1F1'};
  border-radius: 5px;

  & > div:first-child {
    margin: 10px 5px 5px 10px;
    line-height: 14px;
    color: #343434;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;

    h2 {
      font-weight: 700;
    }

    p {
      margin-top: 5px;
    }
  }

  & > div:last-child {
    margin: auto 0;
    height: 90%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: red;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    color: ${props => props.vacancy > 0 || props.selected === true? '#078632' : '#CC6666'}; 
    border-left: 1px solid #D7D7D7;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }

    p {
      margin-top: 5px;
    }
  }
`;

export {
  Container,
  Day,
  Local,
  Event
};
