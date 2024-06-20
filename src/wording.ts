export const COMMON = {
  oc: 'Organisme complémentaire',
  caisse: "Caisse d'assurance maladie",
  caisseShortened: 'Caisse',
  confirm: 'Confirmer',
  cancel: 'Annuler',
  close: 'Fermer',
  prevPage: 'Page précédente',
  nextPage: 'Page suivante',
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
  activeUsers: 'utilisateur(s) actif(s)',
  refusedUsers: 'utilisateur(s) refusé(s)',
  inactiveUsers: 'utilisateur(s) inactif(s)',
  confirmUserValidation:
    "Vous êtes sur le point de valider l'inscription et l'organisation de cet utilisateur.",
  confirmUserRefusal:
    "Vous êtes sur le point de refuser l'inscription de cet utilisateur.",
  confirmationMailSent:
    "Un mail de confirmation vient d'être envoyé à l'utilisateur afin qu'il termine son inscription.",
  refusalConfirmation: "L'utilisateur a bien été refusé.",
  unsubscribeConfirmation: "L'utilisateur a bien été supprimé.",
  confirmUserUnsubscribe:
    'Vous êtes sur le point de supprimer définitivement cet utilisateur.',
  statut: 'Statut',
  selectStatut: 'Sélectionner un statut',
  organisationType: 'Type d’organisation',
  selectStatutOrganisationType: "Sélectionner un type d'organisation",
  search: 'Recherche',
  toModerate: 'A modérer',
  active: 'Actifs',
  refused: 'Refusés',
  inactive: 'Inactifs',
};

export const INFORMATIONS_FORM = {
  title: 'Mes informations',
  subTitle: 'Gérez les informations relatives à votre compte',
};
