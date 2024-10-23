/*
INSERT INTO ressource_thematique (id, date_crea, date_maj, titre, description, groupe, ordre, publique) VALUES
(1, '2021-06-30 11:03:16.000000', '2021-06-30 11:03:16.000000', 'Rubrique OC 1', 'Description 1', 'ORGANISME_COMPLEMENTAIRE', 1, false),
(2, '2022-06-30 11:03:16.000000', '2022-06-30 11:03:16.000000', 'Rubrique Caisse 1', 'Description 2', 'CAISSE', 2, false),
(3, '2023-06-30 11:03:16.000000', '2023-06-30 11:03:16.000000', 'Rubrique OC 2', 'Description 3', 'ORGANISME_COMPLEMENTAIRE', 3, true),
(4, '2024-01-30 11:03:16.000000', '2024-01-30 11:03:16.000000', 'Rubrique Caisse 2', 'Description 4', 'CAISSE', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO ressource_fichier (id, date_crea, date_maj, nom, repertoire, extension, taille, type, ressource_thematique_id) VALUES
(1, '2021-01-30 11:03:16.000000', '2021-02-28 11:03:16.000000', 'Test_fichier_1', '/tmp/resources/', 'pdf', 3455455, 'PDF', 1),
(2, '2021-02-28 11:03:16.000000', '2021-03-30 11:03:16.000000', 'Test_fichier_2', '/tmp/resources/', 'doc', 4855455, 'WORD', 2),
(3, '2021-03-30 11:03:16.000000', '2021-04-30 11:03:16.000000', 'Test_fichier_3', '/tmp/resources/', 'csv', 3455999, 'EXCEL', 3),
(4, '2021-04-30 11:03:16.000000', '2021-05-30 11:03:16.000000', 'Test_fichier_4', '/tmp/resources/', 'pdf', 3455455, 'PDF', 4),
(5, '2021-05-30 11:03:16.000000', '2021-06-30 11:03:16.000000', 'Test_fichier_5', '/tmp/resources/', 'doc', 4855455, 'WORD', 1),
(6, '2021-06-30 11:03:16.000000', '2021-07-30 11:03:16.000000', 'Test_fichier_6', '/tmp/resources/', 'pdf', 3455999, 'EXCEL', 2),
(7, '2021-07-30 11:03:16.000000', '2021-08-30 11:03:16.000000', 'Test_fichier_7', '/tmp/resources/', 'pdf', 3455455, 'PDF', 3),
(8, '2021-08-30 11:03:16.000000', '2021-09-30 11:03:16.000000', 'Test_fichier_8', '/tmp/resources/', 'doc', 4855455, 'WORD', 4),
(9, '2021-09-30 11:03:16.000000', '2021-10-30 11:03:16.000000', 'Test_fichier_9', '/tmp/resources/', 'xls', 3455999, 'EXCEL', 1),
(10, '2021-10-30 11:03:16.000000', '2021-11-30 11:03:16.000000', 'Test_fichier_10', '/tmp/resources/', 'pdf', 3455455, 'PDF', 1),
(11, '2021-11-30 11:03:16.000000', '2021-12-30 11:03:16.000000', 'Test_fichier_12', '/tmp/resources/', 'doc', 4855455, 'WORD', 2),
(12, '2022-01-30 11:03:16.000000', '2022-01-30 11:03:16.000000', 'Test_fichier_13', '/tmp/resources/', 'csv', 3455999, 'EXCEL', 3),
(13, '2022-02-27 11:03:16.000000', '2022-02-27 11:03:16.000000', 'Test_fichier_14', '/tmp/resources/', 'pdf', 3455455, 'PDF', 4),
(14, '2022-03-30 11:03:16.000000', '2022-03-30 11:03:16.000000', 'Test_fichier_15', '/tmp/resources/', 'doc', 4855455, 'WORD', 1),
(15, '2022-04-30 11:03:16.000000', '2022-04-30 11:03:16.000000', 'Test_fichier_16', '/tmp/resources/', 'pdf', 3455999, 'EXCEL', 2),
(16, '2022-05-30 11:03:16.000000', '2022-05-30 11:03:16.000000', 'Test_fichier_17', '/tmp/resources/', 'pdf', 3455455, 'PDF', 3),
(17, '2022-06-30 11:03:16.000000', '2022-06-30 11:03:16.000000', 'Test_fichier_18', '/tmp/resources/', 'doc', 4855455, 'WORD', 4),
(18, '2022-07-30 11:03:16.000000', '2022-07-30 11:03:16.000000', 'Test_fichier_19', '/tmp/resources/', 'xls', 3455999, 'EXCEL', 1),
(19, '2022-08-30 11:03:16.000000', '2023-08-30 11:03:16.000000', 'Test_fichier_21', '/tmp/resources/', 'pdf', 3455455, 'PDF', 1),
(20, '2022-09-30 11:03:16.000000', '2023-09-30 11:03:16.000000', 'Test_fichier_22', '/tmp/resources/', 'doc', 4855455, 'WORD', 2),
(21, '2022-10-30 11:03:16.000000', '2023-10-30 11:03:16.000000', 'Test_fichier_23', '/tmp/resources/', 'csv', 3455999, 'EXCEL', 3),
(22, '2022-11-30 11:03:16.000000', '2023-02-27 11:03:16.000000', 'Test_fichier_24', '/tmp/resources/', 'pdf', 3455455, 'PDF', 4),
(23, '2022-12-30 11:03:16.000000', '2024-03-30 11:03:16.000000', 'Test_fichier_25', '/tmp/resources/', 'doc', 4855455, 'WORD', 1),
(24, '2023-06-30 11:03:16.000000', '2024-04-01 11:03:16.000000', 'Test_fichier_26', '/tmp/resources/', 'pdf', 3455999, 'EXCEL', 2),
(25, '2024-01-30 11:03:16.000000', '2024-04-02 11:03:16.000000', 'Test_fichier_27', '/tmp/resources/', 'pdf', 3455455, 'PDF', 3),
(26, '2024-02-27 11:03:16.000000', '2024-04-03 11:03:16.000000', 'Test_fichier_28', '/tmp/resources/', 'doc', 4855455, 'WORD', 4),
(27, '2024-03-30 11:03:16.000000', '2024-04-04 11:03:16.000000', 'Test_fichier_29', '/tmp/resources/', 'xls', 3455999, 'EXCEL', 1)
ON CONFLICT DO NOTHING;

*/
