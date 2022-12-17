import { RenderPaymentInfo, RenderTicket } from './SectionContents/PaymentContents';

export function RenderSectionContent(text, page) {
  if (page === 'payment') {
    return RenderPaymentContent(text);
  }

  return <></>;
}

function RenderPaymentContent(text) {
  if (text === 'Ingresso escolhido') {
    return RenderTicket();
  }
  if (text === 'Pagamento') {
    return RenderPaymentInfo();
  }

  return <></>;
}
