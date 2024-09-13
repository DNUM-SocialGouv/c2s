# Réintégration de la notion de groupe

## Fichiers à modifier

1. **src/components/moderatorEstablishments/addEstablishmentForm/AddEstablishmentForm.tsx**:

   - Décommenter le champ relatif au groupe dans l'interface/defaultValues/schema yup.
   - Décommenter les boutons radio.
   - Décommenter la fonction d'affichage d'erreur.

2. **src/components/moderatorEstablishments/establishmentInformations/EstablishmentInformations.test.tsx**:

   - Décommenter les constantes `ocRadio` et `caisseRadio`.
   - Décommenter le checking de leur existence dans le DOM.

3. **src/components/moderatorEstablishments/establishmentInformations/EstbalishmentInformations.tsx**:

   - Décommenter le champ relatif au groupe dans l'interface formData/schema yup/defaultValues.
   - Décommenter les boutons radio.
   - Décommenter la fonction d'affichage d'erreur.

4. **src/components/moderatorEstablishments/filters/Filters.tsx**:

   - Décommenter l'import des types (`EstablishmentType`, `establissmentTypes`) et de la fonction `stringToConstantCase`.
   - Décommenter l'import des données de context (`establishmentType`, `setEstablishmentType`).
   - Rétablir la définition du state `availableEstablishmentTypes`.
   - Décommenter l'appel à `setAvailableEstablishmentTypes` dans le fetch.
   - Décommenter la fonction `handleEstablishmentTypeChange`.
   - Décommenter le filtre dans le TSX.

5. **src/contexts/ModeratorEstablishmentsContext.tsx**:
   - Si besoin, remplacer la valeur par défaut (`'ORGANISME_COMPLEMENTAIRE'`) par une string vide.
