ALTER TABLE ressource_thematique
ALTER COLUMN groupe TYPE VARCHAR(100);

ALTER TABLE ressource_thematique RENAME COLUMN groupe TO groupes;

UPDATE ressource_thematique SET groupes='["CAISSE"]' WHERE groupes='CAISSE';
UPDATE ressource_thematique SET groupes='["ORGANISME_COMPLEMENTAIRE"]' WHERE groupes='ORGANISME_COMPLEMENTAIRE';
