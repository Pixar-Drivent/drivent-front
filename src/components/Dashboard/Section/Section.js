import styled from 'styled-components';
import { RenderSectionContent } from './SectionContent';

export function RenderSection({ text, page, renderObject = {}, ignoreTitle = false, ignoreSection = false }) {
  return (
    <SectionContainer>
      {!ignoreTitle ? <SectionTitle>{text}</SectionTitle> : <></>}
      {!ignoreSection ? RenderSectionContent(text, page, renderObject) : <></>}
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  margin: 30px 0 0 0;
`;

const SectionTitle = styled.div`
  width: 100%;
  height: 25px;

  font-family: 'Roboto', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;

  color: #8e8e8e;
`;
