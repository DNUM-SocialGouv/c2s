import React, { CSSProperties } from 'react';
// @ts-expect-error contournement (error free)
import { Captcha, captchaSettings } from 'reactjs-captcha';

interface FrontCapchaComponentProps {
  setCaptchaMethod: (captcha: Captcha) => void;
  id?: string;
  style?: CSSProperties;
}

export default class FrontCaptchaComponent extends React.Component<
  FrontCapchaComponentProps,
  unknown
> {
  captcha: Captcha | null = null;

  constructor(props: FrontCapchaComponentProps) {
    super(props);

    captchaSettings.set({
      captchaEndpoint: 'http://localhost:5173/api/simple-captcha-endpoint',
    });
  }

  componentDidMount() {
    // share the captcha object with the parent
    this.props.setCaptchaMethod(this.captcha!);
  }

  validCaptcha() {
    // données à envoyer dans le formulaire du use case
    console.log(
      this.captcha?.getCaptchaId() +
        ' => ' +
        (
          document.querySelector(
            '#captchaFormulaireExtInput'
          ) as HTMLInputElement
        ).value
    );
  }
  render() {
    return (
      <section id="main-content">
        <div id="form-messages"></div>
        <Captcha
          captchaStyleName="alphabetique6_7CaptchaFR"
          ref={(captcha: Captcha) => {
            this.captcha = captcha;
          }}
        />
        <input id="captchaFormulaireExtInput" type="text" />
        <input type={'submit'} onClick={() => this.validCaptcha()} />
      </section>
    );
  }
}
