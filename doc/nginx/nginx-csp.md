# Configuration de la Content Security Policy (CSP) pour NGINX

Voici la rêgle à ajouter à la configuration NGINX pour gérer les CSP:


```add_header Content-Security-Policy "
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tiny.cloud;
connect-src 'self' https://sentry.fabrique.social.gouv.fr https://cdn.tiny.cloud;
img-src 'self' data: https://sp.tinymce.com https://cdn.tiny.cloud;
style-src 'self' 'unsafe-inline' https://cdn.tiny.cloud;
object-src 'none';
font-src 'self' https://cdn.tiny.cloud;
base-uri 'self';
form-action 'self';
worker-src 'self' blob:;
frame-src 'self' https://cdn.tiny.cloud;
" always;```

Les rêgles préfixées "unsafe" devraient être remplacées (utiliser nonce ? https://content-security-policy.com/nonce/)