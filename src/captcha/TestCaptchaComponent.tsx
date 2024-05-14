import { useRef } from 'react';
import FrontCaptchaComponent from '@/captcha/FrontCaptchaComponent.tsx';

const TestCaptchaComponent = () => {
  const captchaRef = useRef(null);

  const setCaptcha = (captcha: any) => {
    captchaRef.current = captcha;
  };

  return <FrontCaptchaComponent setCaptchaMethod={setCaptcha} />;
};

export default TestCaptchaComponent;
