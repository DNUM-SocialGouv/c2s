-- Script de migration pour désigner un contact par défaut pour chaque entreprise pour les utilisateurs déja inscrits et actifs.

-- Étape 1: Pour chaque OC (siren), attribuer les 3 types de contact au membre ACTIF le plus ancien
-- SEULEMENT si aucun autre membre ACTIF de ce OC n'a déjà un de ces types de contact.
UPDATE membre
SET types = '["GESTION","DECLARATION_TSA","STATISTIQUES"]'
WHERE id IN (
    SELECT MIN(id)
    FROM membre
    WHERE siren IS NOT NULL AND siren <> '' AND statut = 'ACTIF'
    GROUP BY siren
)
AND NOT EXISTS (
    SELECT 1
    FROM membre other
    WHERE other.siren = membre.siren
      AND other.id <> membre.id
      AND other.statut = 'ACTIF'
      AND other.types IS NOT NULL
      AND other.types <> 'null'
      AND (other.types LIKE '%GESTION%' OR other.types LIKE '%DECLARATION_TSA%' OR other.types LIKE '%STATISTIQUES%')
);

-- Étape 2: Pour les entreprises où au moins un type est déjà attribué à un autre membre ACTIF,
-- on attribue uniquement les types manquants au membre ACTIF le plus ancien.

-- 2a. Attribuer GESTION si aucun autre membre ACTIF ne l'a
UPDATE membre
SET types = CASE
    WHEN types IS NULL OR types = 'null' OR types = '[]' THEN '["GESTION"]'
    WHEN types NOT LIKE '%GESTION%' THEN REPLACE(types, ']', ',"GESTION"]')
    ELSE types
END
WHERE id IN (
    SELECT MIN(id)
    FROM membre
    WHERE siren IS NOT NULL AND siren <> '' AND statut = 'ACTIF'
    GROUP BY siren
)
AND NOT EXISTS (
    SELECT 1
    FROM membre other
    WHERE other.siren = membre.siren
      AND other.id <> membre.id
      AND other.statut = 'ACTIF'
      AND other.types IS NOT NULL
      AND other.types <> 'null'
      AND other.types LIKE '%GESTION%'
)
AND (types IS NULL OR types = 'null' OR types NOT LIKE '%GESTION%');

-- 2b. Attribuer DECLARATION_TSA si aucun autre membre ACTIF ne l'a
UPDATE membre
SET types = CASE
    WHEN types IS NULL OR types = 'null' OR types = '[]' THEN '["DECLARATION_TSA"]'
    WHEN types NOT LIKE '%DECLARATION_TSA%' THEN REPLACE(types, ']', ',"DECLARATION_TSA"]')
    ELSE types
END
WHERE id IN (
    SELECT MIN(id)
    FROM membre
    WHERE siren IS NOT NULL AND siren <> '' AND statut = 'ACTIF'
    GROUP BY siren
)
AND NOT EXISTS (
    SELECT 1
    FROM membre other
    WHERE other.siren = membre.siren
      AND other.id <> membre.id
      AND other.statut = 'ACTIF'
      AND other.types IS NOT NULL
      AND other.types <> 'null'
      AND other.types LIKE '%DECLARATION_TSA%'
)
AND (types IS NULL OR types = 'null' OR types NOT LIKE '%DECLARATION_TSA%');

-- 2c. Attribuer STATISTIQUES si aucun autre membre ACTIF ne l'a
UPDATE membre
SET types = CASE
    WHEN types IS NULL OR types = 'null' OR types = '[]' THEN '["STATISTIQUES"]'
    WHEN types NOT LIKE '%STATISTIQUES%' THEN REPLACE(types, ']', ',"STATISTIQUES"]')
    ELSE types
END
WHERE id IN (
    SELECT MIN(id)
    FROM membre
    WHERE siren IS NOT NULL AND siren <> '' AND statut = 'ACTIF'
    GROUP BY siren
)
AND NOT EXISTS (
    SELECT 1
    FROM membre other
    WHERE other.siren = membre.siren
      AND other.id <> membre.id
      AND other.statut = 'ACTIF'
      AND other.types IS NOT NULL
      AND other.types <> 'null'
      AND other.types LIKE '%STATISTIQUES%'
)
AND (types IS NULL OR types = 'null' OR types NOT LIKE '%STATISTIQUES%');
