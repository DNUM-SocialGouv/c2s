package fr.gouv.sante.c2s.model.dto.export;

import com.google.gson.annotations.SerializedName;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExportFileDataDTO {

    @SerializedName("fichier_nom")
    private String fichierNom;

    @SerializedName("fichier_description")
    private String fichierDescription;

    @SerializedName("nb_colonnes")
    private Integer nbColonnes;

    @SerializedName("nb_lignes")
    private Long nbLignes;

    @SerializedName("fichier_checksum_sha1")
    private String fichierChecksumSha1;


}
