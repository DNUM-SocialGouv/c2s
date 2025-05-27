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
  confirmAction: 'Confirmez cette action',
  rechercher: 'Rechercher',
  recherche: 'Recherche',
  information: 'Information',
  chargement: 'Chargement...',
};

const SUBSCRIPTION_PAGE = {
  title: 'Espace partenaires',
  subtitle:
    "Un portail ressources réservé aux caisses d'assurance maladie et aux organismes complémentaires gestionnaires de la C2S.",
};

const MODERATOR_CONTENT = {
  pageTitle: 'Gestion des contenus',
  pageDetail: "Le mot de l'équipe C2S",
  ocHeader: 'Bloc éditorial - Organismes complémentaires',
  ocHeaderDetail: "Contenu affiché sur la page d'accueil après la connexion",
  caisseHeader: "Bloc éditorial - Caisses d'assurance Maladie",
  caisseHeaderDetail: `Contenu affiché sur la page d'accueil après la connexion`,
  successLabel: 'Message enregistré avec succès',
  contentLimitNotice: 'Vous avez dépassé le nombre de caractères autorisés',
  unknownErrorNotice:
    "Une erreur inconnue est survenue, le message n'a pas pu être enregistré",
};

const MODERATOR_USERS = {
  pageTitle: 'Utilisateurs',
  pageDetail: (usersNumber: number) => `${usersNumber} utilisateurs`,
  btnValidate: "Valider l'inscription",
  btnRefusal: "Refuser l'inscription",
  accordionTitle: 'Informations du siège',
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
  firstModalConfirm:
    'Vous êtes sur le point de supprimer un organisme complémentaire ainsi que tous les utilisateurs et les points d’accueil qui lui sont associés. Souhaitez-vous poursuivre ?',
  secondModalConfirm:
    'La suppression d’un organisme complémentaire ainsi que de tous les utilisateurs et les points d’accueil qui lui sont associés est définitive et irréversible. Souhaitez-vous vraiment poursuivre ?',
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

const OC_TEAM = {
  pageTitle: 'Mon équipe',
  pageDetail: (teamMembers: number) =>
    `${teamMembers} membre(s) rattaché(s) à votre organisme complémentaire`,
  addMember: 'Ajouter un membre',
  information:
    "Les membres de votre équipe seront les contacts privilégiés de l'administration. Vous devez définir un contact référent au sein de votre organisme pour la gestion courante de la C2S, le suivi statistique et la déclaration de TSA. Vous ne devez renseigner qu'un seul contact par référence. Un même membre peut être choisi comme contact pour plusieurs références.",
  addNewMember: 'Ajouter un nouveau membre',
  emailFormInstruction:
    'Un e-mail d’invitation sera envoyé à cet utilisateur pour l’inviter à rejoindre l’équipe.',
  emailConfirmation: "l'invitation a bien été envoyée",
  emailSending: "Veuillez patienter, l'envoi est en cours...",
  deleteWarning:
    'Vous êtes sur le point de supprimer un membre de votre équipe',
  typeGestion: 'Gestion',
  typeStatistiques: 'Statistiques',
  typeDeclaration: 'Déclaration TSA',
  saveTypes: 'Enregistrer les types',
  changeTypesError:
    "Une erreur est survenue, les types de cet utilisateur n'ont pas été modifiés",
  changeTypesErrorMail: "L'utilisateur n'a pas d'email associé",
  changeTypesSuccess: 'Les types ont bien été modifiés pour cet utilisateur',
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
  newPA: 'Point d’accueil supplémentaire',
  savePA: 'Enregistrer',
  deletePA: 'Supprimer',
  confirmationDeletePA:
    "Vous êtes sur le point de supprimer un point d'accueil",
  PANumber: (index: string) => `Point d’accueil N° ${index}`,
  FORMULAIRE_SIEGE: {
    denominationSociete: `Nom de l'organisme`,
    siren: 'Siren',
    email: 'E-mail',
    siteWeb: 'Site web',
    adresse: 'Adresse',
    groupe: 'Groupe',
    ville: 'Ville',
    codePostal: 'Code postal',
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
    recherche: 'Recherche',
    recherchePlaceholder: "Nom de l'établissement",
  },
  addNewPointAcceuil: "Ajouter un nouveau point d'accueil",
  addPABtn: "Ajouter le point d'accueil",
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
  inputLabel: 'Nom de la thématique*',
  textAreaLabel: 'Description de la thématique*',
};

const MODERATOR_RESOURCES_FILTERS = {
  thematique: 'Thématique',
  displayAll: 'Tout afficher',
  public: 'Public',
};

const MODERATOR_RESOURCES_ADD_FILE_FORM = {
  thematique: 'Thématique de la ressource*',
  displayAll: 'Tout afficher',
  selectOption: 'Sélectionner une option',
  addRessource: 'Ajouter une nouvelle ressource',
  addFile: 'Ajouter des fichiers*',
  acceptedFiles:
    ' Taille maximale : 4 Mo. Formats supportés : jpg, png, pdf, csv, xls.',
  fileIsRequired: '*Le fichier est requis',
  errorOnSaveFile:
    'Une erreur est survenue lors de l’enregistrement du fichier',
  requiredThematique: '*La thématique est requise',
  requiredFile: '*Le fichier est requis',
};

const MODERATOR_MODERATORS = {
  pageTitle: 'Gestion des modérateurs',
  pageDetail: (moderators: number) => `${moderators} modérateur(s)`,
  addModeratorLabel: 'Ajouter',
  validatedUsersNumber: (users: number) => `${users} utilisateur(s) validé(s)`,
  addNewModerator: 'Ajouter un nouveau modérateur',
  deleteWarning: 'Vous êtes sur le point de supprimer ce modérateur.',
  addNewModeratorBtn: 'Ajouter cet utilisateur',
  emailSending: 'Veuillez patienter, l’envoi est en cours...',
  emailConfirmation: "l'invitation a bien été envoyée",
  emailFormInstruction:
    'Un e-mail d’invitation sera envoyé à cet utilisateur pour l’inviter à rejoindre l’équipe.',
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

const PARTENAIRES_RESSOURCES = {
  title: 'Ressources',
  chapo: 'Mise à jour le ',
  ListeDesReferentsTitre: 'Référents Gestion C2S',
  listeDesReferentsChapo:
    'Téléchargez la liste complète des référents Gestion C2S de chaque organisme complémentaire',
};

const MODERATEUR_ACCUEIL = {
  newMembersNumber: (number: number) =>
    number > 1 ? `${number} utilisateurs` : `${number} utilisateur`,
  badge: 'A modérer',
  figuresTitle: 'En quelques chiffres',
  tileUsers: 'Utilisateurs',
  tileOrganisations: 'Organismes',
  tilePointsAccueil: 'Point d’accueil',
  countActiveUsers: (number: number) =>
    number > 1
      ? `${number} utilisateurs actifs`
      : `${number} utilisateur actif`,
  countActiveOrganisations: (number: number) =>
    number > 1 ? `${number} organismes actifs` : `${number} organisme actif`,
  countActiveEstablishments: (number: number) =>
    number > 1
      ? `${number} points d’accueil actifs`
      : `${number} point d’accueil actif`,
};

export {
  COMMON,
  SUBSCRIPTION_PAGE,
  MODERATOR_CONTENT,
  MODERATOR_USERS,
  INFORMATIONS_FORM,
  NOT_FOUND_PAGE,
  NOT_AUTHORIZED_PAGE,
  OC_MES_ETABLISSEMENTS,
  MODERATOR_ESTABLISHMENTS,
  OC_HISTORY,
  OC_TEAM,
  MODERATOR_HISTORY,
  RESET_PASSWORD_PAGE,
  MODERATOR_RESOURCES_HEADER,
  MODERATOR_RESOURCES_FORM,
  MODERATOR_RESOURCES_FILTERS,
  MODERATOR_MODERATORS,
  ACCUEIL_HEADER_WORDING,
  ACCUIEL_LINKS_WORDING,
  ACCUEIL_CITATION_WORDING,
  ACCUEIL_CITATION_ALTERNATIVE,
  OC_ACCUEIL_TUILES_WORDING,
  MODERATOR_RESOURCES_ADD_FILE_FORM,
  PARTENAIRES_RESSOURCES,
  MODERATEUR_ACCUEIL,
};
