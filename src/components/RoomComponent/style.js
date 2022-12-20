import styled from 'styled-components';

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
    
    ${props => props.isFull?
    'background-color:#E9E9E9;'
    :
    `&:hover{
        cursor: pointer;
        background-color: white;
        filter: brightness(0.8);
        transition: background-color 200ms, filter 200ms;
    &:active{
        transform: translateY(2px);
    }
    }`};

    ${props => props.isSelected?
    'background-color:#FFEED2;'
    :
    'background-color: none'};
    
    h3 {
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 20px;
        ${props => props.isFull? 'color: #9D9D9D': 'color: #454545'};
    }

    svg {
        ${props => props.isFull? 'color: #9D9D9D': 'color: black'};
    }
`;

const StyledRoomCapacityContainer = styled.div`
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export {
  StyledRoomCard,
  StyledRoomCapacityContainer
};
