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

const StyledRoomCard = styled.div`
    width: 23%;
    min-width: 140px;
    height: 45px;
    border: 1px solid #CECECE;
    border-radius: 10px;
    padding: 0 15px;
    margin: 0 8px 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    ${props => props.full?
    'background-color:#E9E9E9;'
    :
    `&:hover{
        cursor: pointer;
        background-color: #FFEED2;
        filter: opacity(0.5);
        transition: background 500ms, filter 500ms;
    &:active{
        transform: translateY(2px);
    }
    }`};
    
    h3 {
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 20px;
        ${props => props.full? 'color: #9D9D9D': 'color: #454545'};
    }

    svg {
        ${props => props.full? 'color: #9D9D9D': 'color: black'};
    }
`;

const StyledRoomCapacityContainer = styled.div`
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export {
  StyledRoomsContainer,
  StyledRoomCard,
  StyledRoomCapacityContainer
};
