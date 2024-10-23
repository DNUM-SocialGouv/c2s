package fr.gouv.sante.c2s.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatutMembreEnum {
    A_MODERER( "A modérer"),
    ACTIF("Actif"),
    INACTIF("Inactif"),
    SUPPRIMER("Supprimé"),
    REFUSE("Refusé");
    private final String libelle;
}
