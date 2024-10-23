CREATE TABLE daily_statistique (
                                   id SERIAL PRIMARY KEY,
                                   count_membre_organisme_complementaire_actif BIGINT,
                                   count_membre_caisse_actif BIGINT,
                                   count_moderateur_actif BIGINT,
                                   count_organisme_complementaire_actif BIGINT,
                                   count_caisse_actif BIGINT,
                                   date_crea TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                   date_maj TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);