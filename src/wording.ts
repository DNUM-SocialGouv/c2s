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
  statut: 'Statut',
  selectStatut: 'Sélectionner un statut',
  organisationType: 'Type d’organisation',
  selectStatutOrganisationType: "Sélectionner un type d'organisation",
  search: 'Recherche',
};

export const INFORMATIONS_FORM = {
  title: 'Mes informations',
  subTitle: 'Gérez les informations relatives à votre compte',
};
