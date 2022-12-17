import { RenderHeader } from '../../../components/Dashboard/Header/header';
import { RenderSection } from '../../../components/Dashboard/Section/Section';

export default function Payment() {
  return RenderPaymnentScreen();
}

export function RenderPaymnentScreen() {
  //need: fetch from the API enrollment and payment data
  //if no payment found: render the following
  //require: enrollment done (does not allow to pay)
  //require: payment not done (does not show payment info)

  return (
    <>
      {RenderHeader({ text: 'Ingresso e pagamento' })}
      {RenderSection({ text: 'Ingresso escolhido', page: 'payment' })}
      {RenderSection({ text: 'Pagamento', page: 'payment' })}
    </>
  );
}
