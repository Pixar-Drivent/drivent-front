import styled from 'styled-components';

import Container from '../Container';

export const StyledContainer = styled(Container)`
  font-size: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-top: 10px;
`;

export const Label = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
export const Subtitle = styled.h1`
font-size: 14px;
color: #8E8E8E;
white-space: nowrap;
margin: 0 10px;
`;

export const Divider = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
margin: 20px 0;
`;

export const Line = styled.span`
width: 100%;
height: 1px;
background-color: #8E8E8E;
opacity: 0.3;
`;

export const OAuthWrapper = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
padding: 0 20px;
margin-bottom: 20px;
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
}
`;

export const LogoWrapper = styled.span`
width: 44px;
height: 44px;
margin-bottom: 6px;
border-radius: 10px;
border: 1px solid rgba(142,142,142,0.3);
display: flex;
align-items: center;
justify-content: center;
img{
  width: 20px;
  height: 20px;
  object-fit: contain;
} 
`;
