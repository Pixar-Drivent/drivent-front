import styled from 'styled-components';

export function NoPermission() {
  return (
    <>
      <NoPermitionCard>
        <div>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</div>
      </NoPermitionCard>
    </>
  );
}

export const NoPermitionCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    width: 448px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: #8e8e8e;
  }
`;
