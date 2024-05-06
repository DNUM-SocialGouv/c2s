import React from 'react';
// @ts-expect-error contournement (error free)
import { Captcha } from 'reactjs-captcha';
import FrontCaptchaComponent from '@/captcha/FrontCaptchaComponent.tsx';

export default class TestCaptchaComponent extends React.Component {
  captcha: Captcha | null = null;

  setCaptcha(captcha: Captcha) {
    this.captcha = captcha;
  }

  render() {
    return (
      <FrontCaptchaComponent setCaptchaMethod={(c) => this.setCaptcha(c)} />
    );
  }
}
