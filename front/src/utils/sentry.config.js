import * as Sentry from '@sentry/react';
import packageJson from '../../package.json';

function getEnvFromHostname() {
  switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
      return 'developpeur';
    case 'c2s-integration.cegedim.cloud':
      return 'integration';
    case 'c2s-preprod.cegedim.cloud':
      return 'preprod';
    case 'c2s-production.cegedim.cloud':
      return 'prod';
    default:
      return 'unknown';
  }
}

export default (async () => {
  console.info('Sentry.init');
  Sentry.init({
    dsn: 'https://a634c98dcafbd7b2f3f9965e47d2bb1e@sentry2.fabrique.social.gouv.fr/31',
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
