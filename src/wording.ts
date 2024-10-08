const COMMON = {
  oc: 'Organisme complémentaire',
  ocRadioValue: 'ORGANISME_COMPLEMENTAIRE',
  pa: "Point d'accueil",
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
  zipCode: 'Code postal',
  city: 'Ville',
  email: 'E-mail',
  phone: 'Téléphone',
  errorMessage: 'Erreur : Veuillez réessayer ultérieurement',
  delete: 'Supprimer',
  cedex: 'Cedex',
  date: 'Date',
  user: 'Utilisateur',
  section: 'Section',
  action: 'Action',
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
    "Vous êtes sur le point de valider l'inscription de cet utilisateur.",
  confirmUserRefusal:
    "Vous êtes sur le point de refuser l'inscription de cet utilisateur.",
  confirmationMailSent:
    "Un mail de confirmation vient d'être envoyé à l'utilisateur afin qu'il définisse son mot de passe.",
  refusalConfirmation: "L'utilisateur a bien été refusé.",
  deleteConfirmation: "L'utilisateur a bien été supprimé.",
  confirmUserDelete:
    'Vous êtes sur le point de supprimer définitivement cet utilisateur.',
  statut: 'Statut',
  selectStatut: 'Sélectionner un statut',
  organisationType: "Type d'organisation",
  selectStatutOrganisationType: "Sélectionner un type d'organisation",
  search: 'Recherche',
  aModerer: 'A modérer',
  valides: 'Actifs',
  refuses: 'Refusés',
  desinscrit: 'Inactifs',
};
const MODERATOR_ESTABLISHMENTS = {
  pageTitle: 'Etablissements',
  pageDetail: (activeOC: number, registerEstablishments: number) =>
    `${activeOC} organismes complémentaires et ${registerEstablishments} points d'accueil enregistrés`,
  newEstablishmentLabel: 'Nouvel organisme',
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
  registeredEstablishmentsNumberTitle: (registeredEstablishments: number) =>
    `${registeredEstablishments} organisme(s) complémentaire(s) trouvé(s)`,
  establishmentName: "Nom de l'établissement",
  addNewEstablishment: 'Ajouter un nouvel organisme complémentaire',
  organisationType: "Type d'organisation",
  establishmentCreated: (establishmentName: string) =>
    `L'établissement ${establishmentName} a bien été enregistré`,
  establishmentUpdated: "L'établissement a bien été modifié",
  establishmentDeleted: "L'établissement a bien été supprimé",
};

const MODERATOR_HISTORY = {
  pageTitle: 'Historique des actions',
  pageDetail:
    "Retrouvez la liste des actions d'édition réalisées par les utilisateurs de l'espace connecté",
};

const OC_HISTORY = {
  pageTitle: 'Historique des actions',
  pageDetail:
    'Retrouvez la liste des actions d’édition réalisées par votre équipe',
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
  siegeDeLaSociete: 'Siège de l’organisme',
  FORMULAIRE_SIEGE: {
    denominationSociete: `Nom de l'organisme`,
    siren: 'Siren',
    email: 'E-mail',
    siteWeb: 'Site web',
    adresse: 'Adresse',
    groupe: 'Groupe',
    successMessage: 'Le siège est mis à jour.',
    telephone: 'Téléphone',
    definirCommeSiege: `Inclure le siège comme un point d'accueil`,
    informationMessage:
      'Ne pas cocher la case s’il existe déjà un point d’accueil avec l’adresse souhaitée, sinon un doublon sera généré.',
  },
  FORMULAIRE_POINT_ACCUEIL: {
    PANumber: `point d'accueil N°`,
    adresse: 'N° et libellé de la voie *',
    adresse2: 'Lieu-dit ou boîte postale',
    adresse3: 'Information complémentaire',
    cedex: 'Cedex',
    zipCode: 'Code postal *',
    ville: 'Ville *',
    telephone: 'Téléphone *',
    email: 'E-mail *',
    createPASuccessMsg: `Le point d'accueil a été ajouté!`,
    updatePASuccessMsg: `Le point d'accueil a été mis à jour!`,
  },
  FILTRES_POINT_ACCUEIL: {
    region: 'Région',
    departement: 'Département',
    selectRegion: 'Sélectionner une région',
    reinitFilter: 'Réinitialiser le filtre',
    selectDepartement: 'Sélectionner un département',
  },
};

const RESET_PASSWORD_PAGE = {
  title: 'Définition du mot de passe',
  newPassword: 'Nouveau mot de passe',
  passwordInfos:
    '12 caractères, composé de chiffres, lettres et caractères spéciaux parmis les caractères suivants : @$!%*#?&',
  confirmPassword: 'Confirmation du nouveau mot de passe',
  passwordNotMatch: 'Les mots de passe ne sont pas identiques.',
  successMsg: 'Votre nouveau mot de passe a bien été enregistré',
  toConnectionPage: 'Retour à la connexion',
};

const MODERATOR_RESOURCES_HEADER = {
  title: 'Ressources',
  count: 'ressources publiées',
  newThematic: 'Nouvelle thématique',
  newResource: 'Nouvelle ressource',
};

const MODERATOR_RESOURCES_FORM = {
  title: 'Ressources',
  count: 'ressources publiées',
  newThematic: 'Nouvelle thématique',
  newResource: 'Nouvelle ressource',
  inputLabel: 'Nom de la thématique',
  textAreaLabel: 'Description de la thématique',
};

const MODERATOR_RESOURCES_FILTERS = {
  thematique: 'Thématique',
  displayAll: 'Tout afficher',
  public: 'Public',
};

const ACCUEIL_HEADER_WORDING = {
  welcomeMessage: 'Ravi de vous retrouver',
  welcomeMessageIcon: '👋',
};

const ACCUIEL_LINKS_WORDING = {
  title: `Dernières ressources mises à disposition`,
  buttonText: 'Toutes les ressources',
};

const ACCUEIL_CITATION_WORDING = {
  title: `Le petit mot de l'équipe C2S`,
  author: `L'équipe C2S`,
};

const ACCUEIL_CITATION_ALTERNATIVE = "photo du membre de l''équipe C2S";

const OC_ACCUEIL_TUILES_WORDING = {
  informations: {
    titre: 'Mes informations',
    detail: 'Gérez vos données personnelles',
  },
  etablissement: {
    titre: 'Mes établissements',
    detail: 'Gérez vos différents établissements',
  },
  equipe: {
    titre: 'Mon équipe',
    detail: 'Gérez les membres de votre organisation',
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
  OC_HISTORY,
  MODERATOR_HISTORY,
  RESET_PASSWORD_PAGE,
  MODERATOR_RESOURCES_HEADER,
  MODERATOR_RESOURCES_FORM,
  MODERATOR_RESOURCES_FILTERS,
  ACCUEIL_HEADER_WORDING,
  ACCUIEL_LINKS_WORDING,
  ACCUEIL_CITATION_WORDING,
  ACCUEIL_CITATION_ALTERNATIVE,
  OC_ACCUEIL_TUILES_WORDING,
};
