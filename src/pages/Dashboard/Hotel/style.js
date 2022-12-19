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

export { StyledRoomsContainer };
