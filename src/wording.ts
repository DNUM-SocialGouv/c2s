const COMMON = {
  oc: 'Organisme complémentaire',
  ocRadioValue: 'ORGANISME_COMPLEMENTAIRE',
  caisse: "Caisse d'assurance maladie",
  caisseRadioValue: 'CAISSE',
  caisseShortened: 'Caisse',
  save: 'Enregistrer',
  confirm: 'Confirmer',
  cancel: 'Annuler',
  close: 'Fermer',
  prevPage: 'Page précédente',
  nextPage: 'Page suivante',
  all: 'Tous',
  allBis: 'Toutes',
  siren: 'SIREN',
  adress: 'Adresse',
  email: 'E-mail',
  phone: 'Téléphone',
  errorMessage: 'Erreur : Veuillez réessayer ultérieurement',
  delete: 'Supprimer',
};

const MODERATOR_CONTENT = {
  pageTitle: 'Gestion des contenus',
  pageDetail: "Le mot de l'équipe C2S",
  ocHeader: 'Bloc éditorial - Organismes complémentaires',
  ocHeaderDetail: "Contenu affiché sur la page d'accueil après la connexion",
  caisseHeader: "Bloc éditorial - Caisses d'assurance Maladie",
  caisseHeaderDetail: `Contenu affiché sur la page d'accueil après la connexion`,
};

const MODERATOR_USERS = {
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
  organisationType: "Type d'organisation",
  selectStatutOrganisationType: "Sélectionner un type d'organisation",
  search: 'Recherche',
  toModerate: 'A modérer',
  active: 'Actifs',
  refused: 'Refusés',
  inactive: 'Inactifs',
};

const MODERATOR_ESTABLISHMENTS = {
  pageTitle: 'Etablissements',
  pageDetail: (activeOC: number, registerEstablishments: number) =>
    `${activeOC} OC actifs / ${registerEstablishments} établissements enregistrés`,
  newEstablishmentLabel: 'Nouvel établissement',
  search: 'Recherche',
  establishmentType: 'Type d’établissement',
  region: 'Région',
  departement: 'Département',
  chooseRegion: 'Sélectionner une région',
  chooseDepartement: 'Sélectionner un département',
  addContact: 'Ajouter un contact',
  establishmentInformation: 'Informations du siège',
  establishmentsNumber: (establishements: number) =>
    `${establishements} point(s) d’accueil`,
  registeredPasNumberTitle: (pas: number) =>
    `${pas} sièges et points d’accueil enregistrés`,
  establishmentName: "Nom de l'établissement",
  addNewEstablishment: 'Ajouter un nouvel etablissement',
  organisationType: "Type d'organisation",
  establishmentCreated: "L'établissement a bien été enregistré",
  establishmentUpdated: "L'établissement a bien été modifié",
  establishmentDeleted: "L'établissement a bien été supprimé",
};

const INFORMATIONS_FORM = {
  title: 'Mes informations',
  subTitle: 'Gérez les informations relatives à votre compte',
  errorMessage: 'Erreur: veuilliez réessayer ultérieurement',
  successMessage: 'Vos informations ont été mises à jour',
};

const NOT_FOUND_PAGE = {
  title: 'Page introuvable',
  errorMessage: 'Erreur 404',
  errorDescriptionFirstLigne: 'La page que vous cherchez est introuvable.',
  errorDescriptionSecondLigne: 'Excusez-nous pour la gêne occasionnée',
  errorDetailFirsLine:
    'Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible.',
  errorDetailSecondLine:
    'Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil, ou effectuer une recherche avec notre moteur de recherche en haut de page.',
};

const NOT_AUTHORIZED_PAGE = {
  title: `Accès non autorisé`,
  errorMessage: 'Erreur 403',
  errorDescriptionFirstLigne: `Vous n'êtes pas autorisé à accéder à cette page`,
  errorDescriptionSecondLigne: 'Excusez-nous pour la gêne occasionnée',
  errorDetailFirsLine:
    'Veuillez vous connecter avec les bons identifiants pour accéder à cette page.',
  errorDetailSecondLine:
    'Pour continuer votre visite vous pouvez consulter notre page d’accueil, ou effectuer une recherche avec notre moteur de recherche en haut de page.',
};

const OC_MES_ETABLISSEMENTS = {
  title: 'Mes établissements',
  updateDate: 'Mise à jour le',
  addPointAcceuil: `Ajouter un point d'accueil`,
  siegeDeLaSociete: 'Siège de la société',
  FORMULAIRE_SIEGE: {
    denominationSociete: 'Dénomination de la société',
    siren: 'Siren',
    email: 'E-mail',
    siteWeb: 'Site web',
    adresse: 'Adresse',
    groupe: 'Groupe',
    successMessage: 'Le siège est mis à jour.',
    telephone: 'Téléphone',
    definirCommeSiege: `Inclure le siège comme un point d'accueil`,
  },
  FORMULAIRE_POINT_ACCUEIL: {
    PANumber: `point d'accueil N°`,
    adresse: 'Adresse',
    zipCode: 'Code postal',
    ville: 'Ville',
    createPASuccessMsg: `Le point d'acceil a été ajouté!`,
    updatePASuccessMsg: `Le point d'acceil a été mis à jour!`,
  },
};

export {
  COMMON,
  MODERATOR_CONTENT,
  MODERATOR_USERS,
  INFORMATIONS_FORM,
  NOT_FOUND_PAGE,
  NOT_AUTHORIZED_PAGE,
  OC_MES_ETABLISSEMENTS,
  MODERATOR_ESTABLISHMENTS,
};
