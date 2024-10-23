ALTER TABLE daily_statistique ADD COLUMN count_point_accueil_actif INTEGER;

UPDATE daily_statistique SET count_point_accueil_actif=1315;