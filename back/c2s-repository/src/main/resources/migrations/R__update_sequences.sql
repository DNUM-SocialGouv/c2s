DO $$
DECLARE
  max_membre_id integer;
  max_entreprise_id integer;
  max_etablissement_id integer;
  max_historic_operation_id integer;
  max_message_accueil_id integer;
  max_ressource_fichier_id integer;
  max_ressource_thematique_id integer;
  max_daily_statistique_id integer;
BEGIN
  -- Séquence pour la table membre
SELECT COALESCE(MAX(id), 0) + 1 INTO max_membre_id FROM membre;
EXECUTE 'ALTER SEQUENCE membre_id_seq RESTART WITH ' || max_membre_id;

-- Séquence pour la table entreprise
SELECT COALESCE(MAX(id), 0) + 1 INTO max_entreprise_id FROM entreprise;
EXECUTE 'ALTER SEQUENCE entreprise_id_seq RESTART WITH ' || max_entreprise_id;

-- Séquence pour la table etablissement
SELECT COALESCE(MAX(id), 0) + 1 INTO max_etablissement_id FROM etablissement;
EXECUTE 'ALTER SEQUENCE etablissement_id_seq RESTART WITH ' || max_etablissement_id;

-- Séquence pour la table historic_operation
SELECT COALESCE(MAX(id), 0) + 1 INTO max_historic_operation_id FROM history_operation;
EXECUTE 'ALTER SEQUENCE historic_operation_id_seq RESTART WITH ' || max_historic_operation_id;

-- Séquence pour la table message_accueil
SELECT COALESCE(MAX(id), 0) + 1 INTO max_message_accueil_id FROM message_accueil;
EXECUTE 'ALTER SEQUENCE message_accueil_id_seq RESTART WITH ' || max_message_accueil_id;

-- Séquence pour la table ressource_fichier
SELECT COALESCE(MAX(id), 0) + 1 INTO max_ressource_fichier_id FROM ressource_fichier;
EXECUTE 'ALTER SEQUENCE ressource_fichier_id_seq RESTART WITH ' || max_ressource_fichier_id;

-- Séquence pour la table ressource_thematique
SELECT COALESCE(MAX(id), 0) + 1 INTO max_ressource_thematique_id FROM ressource_thematique;
EXECUTE 'ALTER SEQUENCE ressource_thematique_id_seq RESTART WITH ' || max_ressource_thematique_id;

-- Séquence pour la table daily_statistique
SELECT COALESCE(MAX(id), 0) + 1 INTO max_daily_statistique_id FROM daily_statistique;
EXECUTE 'ALTER SEQUENCE daily_statistique_id_seq RESTART WITH ' || max_daily_statistique_id;
END $$;