DELETE FROM ressource_fichier;

ALTER TABLE ressource_fichier ADD COLUMN uuid VARCHAR(36) NOT NULL;