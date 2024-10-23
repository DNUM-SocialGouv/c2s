INSERT INTO message_accueil (id, date_crea, date_maj, contenu, groupe) VALUES
    (1, '2021-06-30 11:03:16.000000', '2021-06-30 11:03:16.000000', 'Bienvenu OC 1 First', 'ORGANISME_COMPLEMENTAIRE'),
    (2, '2022-06-30 11:03:16.000000', '2022-06-30 11:03:16.000000', 'Bienvenu Caisse 1 First', 'CAISSE'),
    (3, '2023-06-30 11:03:16.000000', '2023-06-30 11:03:16.000000', 'Bienvenu OC 2 Second', 'ORGANISME_COMPLEMENTAIRE'),
    (4, '2024-01-30 11:03:16.000000', '2024-01-30 11:03:16.000000', 'Bienvenu Caisse 2 Second', 'CAISSE')
    ON CONFLICT DO NOTHING;
