# Configuration de la Content Security Policy (CSP) pour NGINX

Voici la rêgle à ajouter à la configuration NGINX pour gérer les CSP:

```
add_header Content-Security-Policy "
        default-src 'self';
        script-src 'self' https://cdn.tiny.cloud;
        connect-src 'self' https://sentry.fabrique.social.gouv.fr https://cdn.tiny.cloud;
        img-src 'self' data: https://sp.tinymce.com;
        style-src 'self' 'unsafe-inline' https://cdn.tiny.cloud;
        font-src 'self';
        base-uri 'self';
        form-action 'self';
        worker-src 'self' blob:;
        frame-src 'self';
    " always;
```