import ReactDOM from 'react-dom/client';

import TestCaptchaComponent from '@/captcha/TestCaptchaComponent.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<TestCaptchaComponent />);
} else {
  console.error('The element with the ID "root" was not found.');
}
