import styled from 'styled-components';

export function RenderHeader({ text }) {
  return (
    <>
      <Header>{text}</Header>
    </>
  );
}

const Header = styled.header`
  width: 100%;
  height: 40px;
  margin: 0 0 0 0;

  font-family: 'Roboto', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
`;
