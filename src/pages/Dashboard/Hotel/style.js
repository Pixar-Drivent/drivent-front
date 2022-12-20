import styled from 'styled-components';

const StyledRoomsContainer = styled.div`
    width: 100%;
    margin-top: 50px;

    h1 {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: #8E8E8E;
        margin-bottom: 30px;
    }

    & > div {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
`;

const ButtomContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  margin-top: 50px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;

  &:hover{
    cursor: pointer;
    background-color: white;
    filter: brightness(0.8);
    transition: background-color 200ms, filter 200ms;
  };

  &:active{
    transform: translateY(2px);
  };
`;

export {
  StyledRoomsContainer,
  ButtomContainer
};
