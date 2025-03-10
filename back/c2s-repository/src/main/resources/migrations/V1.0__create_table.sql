CREATE TABLE IF NOT EXISTS entreprise (
    id SERIAL PRIMARY KEY,
    siren varchar(20) NOT NULL UNIQUE,
    type varchar(255),
    nom varchar(255),
    adresse varchar(255),
    code_postal varchar(255),
    ville varchar(255),
    departement varchar(255),
    region varchar(255),
    habilite varchar(255),
    arrete varchar(255),
    site_web varchar(255),
    date_crea timestamp without time zone ,
    date_maj timestamp without time zone,
    etat varchar(255),
    telephone varchar(30),
    email varchar(255),
    etablissement_id integer NULL,
    groupe varchar(25)
);

CREATE TABLE IF NOT EXISTS membre (
    id SERIAL PRIMARY KEY,
    siren varchar(20) NULL,
    civilite varchar(20),
    nom varchar(255),
    prenom varchar(255),
    email varchar(255) NOT NULL UNIQUE,
    createur varchar(255),
    modificateur varchar(255),
    date_maj timestamp without time zone,
    date_inscription timestamp without time zone,
    rgpd_date timestamp without time zone,
    rgpd_origine varchar(255),
    rgpd_consentement varchar(255),
    password varchar(255),
    fonction varchar(255),
    societe varchar(255),
    societe_siret varchar(255),
    formindicateur_droits_sirens text,
    telephone varchar(255),
    adresse varchar(255),
    code_postal varchar(255),
    departement varchar(255),
    region varchar(255),
    groupe varchar(25),
    statut varchar(25),
    types varchar(500),
    date_last_login timestamp without time zone,
    CONSTRAINT fk_entreprise__membre FOREIGN KEY (siren)
    REFERENCES entreprise(siren)
    );

CREATE TABLE IF NOT EXISTS etablissement (
    id SERIAL PRIMARY KEY,
    siren varchar(20),
    nom varchar(255),
    adresse1 varchar(255),
    adresse2 varchar(255),
    adresse3 varchar(255),
    code_postal varchar(255),
    ville varchar(255),
    cedex varchar(255),
    departement varchar(255),
    region varchar(255),
    telephone varchar(255),
    email varchar(255),
    date_crea timestamp without time zone,
    date_maj timestamp without time zone,
    etat varchar(20),
    CONSTRAINT fk_entreprise__etablissement FOREIGN KEY (siren)
    REFERENCES entreprise(siren)
    );


CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
    siren varchar(20) ,
    nom varchar(255),
    prenom varchar(255),
    adresse1 varchar(255),
    adresse2 varchar(255),
    adresse3 varchar(255),
    code_postal varchar(255),
    ville varchar(255),
    cedex varchar(255),
    departement varchar(255),
    region varchar(255),
    telephone varchar(255),
    email varchar(255),
    service varchar(255),
    fonction varchar(255),
    date_crea timestamp without time zone,
    date_maj timestamp without time zone,
    etat varchar(20),
    types varchar(500),
    CONSTRAINT fk_entreprise__contact FOREIGN KEY (siren)
    REFERENCES entreprise(siren)
);
