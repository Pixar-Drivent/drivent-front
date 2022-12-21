import { RenderUnauthorizedPage } from './SectionContents/ActivitiesContents';
import { RenderConfirmation, RenderPaymentInfo, RenderTicket } from './SectionContents/PaymentContents';

export function RenderSectionContent(text, page, renderObject) {
  if (page === 'payment') {
    return RenderPaymentContent(text, renderObject);
  }
  if (page === 'payment-done') {
    return RenderConfirmation();
  }
  if (page === 'unauthorized') {
    return RenderActivitiesUnauthorized(renderObject);
  }

  return <></>;
}

function RenderPaymentContent(text, renderObject = {}) {
  if (text === 'Ingresso escolhido') {
    return RenderTicket(renderObject);
  }
  if (text === 'Pagamento') {
    return RenderPaymentInfo(renderObject);
  }

  return <></>;
}

function RenderActivitiesUnauthorized(renderObject) {
  return RenderUnauthorizedPage(renderObject);
}
