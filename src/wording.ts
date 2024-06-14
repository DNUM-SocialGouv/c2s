export const COMMON = {
  oc: 'Organisme complémentaire',
  caisse: "Caisse d'assurance maladie",
  confirm: 'Confirmer',
  cancel: 'Annuler',
  close: 'Fermer',
};

export const MODERATOR_CONTENT = {
  pageTitle: 'Gestion des contenus',
  pageDetail: "Le mot de l'équipe C2S",
  ocHeader: 'Bloc éditorial - Organismes complémentaires',
  ocHeaderDetail: "Contenu affiché sur la page d'accueil après la connexion",
  caisseHeader: "Bloc éditorial - Caisses d'assurance Maladie",
  caisseHeaderDetail: `Contenu affiché sur la page d'accueil après la connexion`,
};

export const MODERATOR_USERS = {
  pageTitle: 'Utilisateurs',
  pageDetail: (usersNumber: number) => `${usersNumber} utilisateurs`,
  btnValidate: "Valider l'inscription",
  btnRefusal: "Refuser l'inscription",
  accordionTitle: 'Informations du siège',
  confirmAction: 'Confirmez cette action',
  usersToModerate: 'utilisateur(s) à modérer',
  validateConfirm:
    "Vous êtes sur le point de valider l'inscription et l'organisation de cet utilisateur.",
  refusalConfirm:
    "Vous êtes sur le point de refuser l'inscription de cet utilisateur.",
  confirmationMailSent:
    "Un mail de confirmation vient d'être envoyé à l'utilisateur afin qu'il termine son inscription.",
  refusalConfirmation: "L'utilisateur a bien été refusé.",
};

export const INFORMATIONS_FORM = {
  title: 'Mes informations',
  subTitle: 'Gérez les informations relatives à votre compte',
};

export const NOT_FOUND_PAGE = {
  title: 'Page introuvable',
  errorMessage: 'Erreur 404',
  errorDescriptionFirstLigne: 'La page que vous cherchez est introuvable.',
  errorDescriptionSecondLigne: 'Excusez-nous pour la gêne occasionnée',
  errorDetailFirsLine:
    'Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible.',
  errorDetailSecondLine:
    'Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil, ou effectuer une recherche avec notre moteur de recherche en haut de page.',
};

export const NOT_AUTHORIZED_PAGE = {
  title: `Accès non autorisé`,
  errorMessage: 'Erreur 403',
  errorDescriptionFirstLigne: `Vous n'êtes pas autorisé à accéder à cette page`,
  errorDescriptionSecondLigne: 'Excusez-nous pour la gêne occasionnée',
  errorDetailFirsLine:
    'Veuillez vous connecter avec les bons identifiants pour accéder à cette page.',
  errorDetailSecondLine:
    'Pour continuer votre visite vous pouvez consulter notre page d’accueil, ou effectuer une recherche avec notre moteur de recherche en haut de page.',
};
