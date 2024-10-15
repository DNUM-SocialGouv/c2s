import * as Sentry from '@sentry/react';
import packageJson from '../../package.json';

function getEnvFromHostname() {
  console.log('window.location.hostname', window.location.hostname);
  switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
      return 'development';
    case 'c2s-integration.cegedim.cloud':
      return 'intégration';
    case 'c2s-preprod.cegedim.cloud':
      return 'pre-production';
    case 'c2s-production.cegedim.cloud':
      return 'production';
    default:
      return 'unknown';
  }
}

export default (async () => {
  console.info('Sentry.init');
  Sentry.init({
    dsn: 'https://04d9fde19c38836539d8daf5b1fdfe4b@sentry.fabrique.social.gouv.fr/108',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [/^\/api/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    release: packageJson.version,
    environment: getEnvFromHostname(),
  });
})();
