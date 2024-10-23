/* contact */
UPDATE contact SET departement='Corse-du-Sud', region='Corse' WHERE code_postal LIKE '200%' OR code_postal LIKE '201%';
UPDATE contact SET departement='Haute-Corse', region='Corse' WHERE code_postal LIKE '202%' OR code_postal LIKE '206%';
UPDATE contact SET departement='Guadeloupe', region='Guadeloupe' WHERE code_postal LIKE '971%';
UPDATE contact SET departement='Martinique', region='Martinique' WHERE code_postal LIKE '972%';
UPDATE contact SET departement='Guyane', region='Guyane' WHERE code_postal LIKE '973%';
UPDATE contact SET departement='La Réunion', region='La Réunion' WHERE code_postal LIKE '974%';
UPDATE contact SET departement='Mayotte', region='Mayotte' WHERE code_postal LIKE '976%';

/* entreprise */
UPDATE entreprise SET departement='Corse-du-Sud', region='Corse' WHERE code_postal LIKE '200%' OR code_postal LIKE '201%';
UPDATE entreprise SET departement='Haute-Corse', region='Corse' WHERE code_postal LIKE '202%' OR code_postal LIKE '206%';
UPDATE entreprise SET departement='Guadeloupe', region='Guadeloupe' WHERE code_postal LIKE '971%';
UPDATE entreprise SET departement='Martinique', region='Martinique' WHERE code_postal LIKE '972%';
UPDATE entreprise SET departement='Guyane', region='Guyane' WHERE code_postal LIKE '973%';
UPDATE entreprise SET departement='La Réunion', region='La Réunion' WHERE code_postal LIKE '974%';
UPDATE entreprise SET departement='Mayotte', region='Mayotte' WHERE code_postal LIKE '976%';

/* etablissement */
UPDATE etablissement SET departement='Corse-du-Sud', region='Corse' WHERE code_postal LIKE '200%' OR code_postal LIKE '201%';
UPDATE etablissement SET departement='Haute-Corse', region='Corse' WHERE code_postal LIKE '202%' OR code_postal LIKE '206%';
UPDATE etablissement SET departement='Guadeloupe', region='Guadeloupe' WHERE code_postal LIKE '971%';
UPDATE etablissement SET departement='Martinique', region='Martinique' WHERE code_postal LIKE '972%';
UPDATE etablissement SET departement='Guyane', region='Guyane' WHERE code_postal LIKE '973%';
UPDATE etablissement SET departement='La Réunion', region='La Réunion' WHERE code_postal LIKE '974%';
UPDATE etablissement SET departement='Mayotte', region='Mayotte' WHERE code_postal LIKE '976%';

