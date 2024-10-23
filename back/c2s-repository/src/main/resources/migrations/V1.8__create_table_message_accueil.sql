
CREATE TABLE IF NOT EXISTS message_accueil (
    id SERIAL PRIMARY KEY,
    date_crea timestamp without time zone,
    date_maj timestamp without time zone,
    contenu VARCHAR(255),
    groupe VARCHAR(25)
);
