
CREATE TABLE IF NOT EXISTS ressource_thematique (
    id SERIAL PRIMARY KEY,
    date_crea timestamp without time zone,
    date_maj timestamp without time zone,
    titre VARCHAR(255),
    description TEXT,
    groupe VARCHAR(25),
    ordre INTEGER,
    publique boolean
);

CREATE TABLE IF NOT EXISTS ressource_fichier (
    id SERIAL PRIMARY KEY,
    date_crea timestamp without time zone,
    date_maj timestamp without time zone,
    nom VARCHAR(255),
    repertoire VARCHAR(255),
    extension VARCHAR(10),
    taille INTEGER,
    type VARCHAR(5),
    ressource_thematique_id int default null,
    CONSTRAINT fk_ressource_thematique FOREIGN KEY (ressource_thematique_id)
    REFERENCES ressource_thematique(id)
);

