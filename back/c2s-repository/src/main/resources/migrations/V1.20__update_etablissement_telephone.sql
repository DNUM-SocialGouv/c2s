UPDATE etablissement SET telephone=replace(telephone, ' ', '');
UPDATE etablissement SET telephone=replace(telephone, '.', '');
UPDATE etablissement SET telephone='0980980880' WHERE telephone LIKE '0980980%' AND telephone LIKE '%880';
