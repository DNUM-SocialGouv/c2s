import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Captcha, captchaSettings } from 'reactjs-captcha';

interface FrontCaptchaComponentProps {
  setCaptchaMethod: (captcha: any) => void;
  id?: string;
  style?: CSSProperties;
}

type Captcha = any;

const FrontCaptchaComponent: React.FC<FrontCaptchaComponentProps> = ({
  setCaptchaMethod,
}) => {
  const captchaRef = useRef<Captcha | null>(null);
  const [captchaState, setCaptchaState] = useState<string>('');

  useEffect(() => {
    captchaSettings.set({
      captchaEndpoint: import.meta.env.VITE_REACT_APP_CAPTCHA_ENDPOINT,
    });
    setCaptchaMethod(captchaRef.current!);
  }, [setCaptchaMethod]);

  const handleCaptchaValidation = () => {
    const captchaId = captchaRef.current?.getCaptchaId();
    const captchaValue = (
      document.getElementById('captchaFormulaireExtInput') as HTMLInputElement
    )?.value;

    fetch(import.meta.env.VITE_REACT_APP_CAPTCHA_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ captchaId, captchaValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          captchaRef.current?.reloadImage();
          setCaptchaState('failed');
        } else {
          setCaptchaState('successful');
        }
      })
      .catch((error) => {
        console.error('Error validating captcha:', error);
        setCaptchaState('error');
      });
  };

  return (
    <section id="main-content">
      <div id="form-messages"></div>
      <Captcha captchaStyleName="alphabetique6_7CaptchaFR" ref={captchaRef} />
      <input id="captchaFormulaireExtInput" type="text" />
      <input type="submit" value="Valider" onClick={handleCaptchaValidation} />
      {captchaState && <p>Captcha State: {captchaState}</p>}
    </section>
  );
};

export default FrontCaptchaComponent;
