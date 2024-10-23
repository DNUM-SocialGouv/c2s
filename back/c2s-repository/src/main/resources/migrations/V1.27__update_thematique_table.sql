UPDATE ressource_thematique SET groupes=NULL WHERE groupes='[]';

UPDATE ressource_thematique SET groupes='CAISSE' WHERE groupes='["CAISSE"]';
UPDATE ressource_thematique SET groupes='ORGANISME_COMPLEMENTAIRE' WHERE groupes='["ORGANISME_COMPLEMENTAIRE"]';

UPDATE ressource_thematique SET groupes='CAISSE,ORGANISME_COMPLEMENTAIRE' WHERE groupes='["CAISSE","ORGANISME_COMPLEMENTAIRE"]';
UPDATE ressource_thematique SET groupes='CAISSE,ORGANISME_COMPLEMENTAIRE' WHERE groupes='["ORGANISME_COMPLEMENTAIRE","CAISSE"]';
