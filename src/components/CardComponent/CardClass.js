import React from 'react';
import Card from 'react-credit-cards';

import { formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData } from './CardUtils';

import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';

export default class RenderCard extends React.Component {
  state = this.props.alterValue[1];

  something = this.props;

  handleCallback = ({ issuer }, isValid) => {
    const setPaymentInfo = this.props.alterValue[0];
    const paymentInfo = this.props.alterValue[1];
    if (isValid) {
      this.setState({ issuer });
      setPaymentInfo({ ...paymentInfo, issuer: issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    const setPaymentInfo = this.props.alterValue[0];
    const paymentInfo = this.props.alterValue[1];

    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
      setPaymentInfo({ ...paymentInfo, number: target.value });
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
      setPaymentInfo({ ...paymentInfo, expiry: target.value });
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
      setPaymentInfo({ ...paymentInfo, cvc: target.value });
    } else if (target.name === 'name') {
      setPaymentInfo({ ...paymentInfo, name: target.value });
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <CardContainer key="Payment">
        <CardContainer>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />

          {/* CARD NUMBER: */}

          <CardInfoForms ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
            <InputContainer>
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <AuxiliarText>E.g.: 49..., 51..., 36..., 37...</AuxiliarText>
            </InputContainer>

            {/* CARD NAME: */}

            <InputContainer>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </InputContainer>

            {/* VALID + CVC */}

            <RowContainer>
              {/* VALID THRU */}

              <InputSmallContainer type={'valid'}>
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </InputSmallContainer>

              {/* CVC */}

              <InputSmallContainer type={'cvc'}>
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </InputSmallContainer>
            </RowContainer>

            {/*  */}

            <input type="hidden" name="issuer" value={issuer} />

            {/*  */}
          </CardInfoForms>
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
        </CardContainer>
      </CardContainer>
    );
  }
}

const CardInfoForms = styled.form`
  margin: 0 0 0 25px;

  div {
    margin: 0 0 30px 0;
    height: 40px;
    color: grey;
  }
`;

const AuxiliarText = styled.div`
  font-size: 14px;
`;

const CardContainer = styled.div`
  display: flex;
  width: 750px;

  margin: 15px 0 15px 0;

  .rccs {
    margin: 0;
  }
`;

const RowContainer = styled.div`
  width: 350px;
  display: flex;
`;

const InputContainer = styled.div`
  input {
    height: 40px;
    width: 350px;
    border-radius: 5px;
    border-color: #e0e0e0;
  }
`;

const InputSmallContainer = styled.div`
  input {
    height: 40px;
    width: ${(props) => (props.type === 'cvc' ? '100px' : '200px')};
    border-radius: 5px;
    border-color: #e0e0e0;
    margin: ${(props) => (props.type === 'cvc' ? '0 0 0 50px' : '0 0 0 0')};
  }
`;
