import { RenderPaymentInfo, RenderTicket } from './SectionContents/PaymentContents';

export function RenderSectionContent(text, page, renderObject) {
  if (page === 'payment') {
    return RenderPaymentContent(text, renderObject);
  }

  return <></>;
}

function RenderPaymentContent(text, renderObject = {}) {
  if (text === 'Ingresso escolhido') {
    return RenderTicket(renderObject);
  }
  if (text === 'Pagamento') {
    return RenderPaymentInfo();
  }

  return <></>;
}
