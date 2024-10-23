package fr.gouv.sante.c2s.model.dto.export;

import com.google.gson.annotations.SerializedName;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExportSafeAmeliDTO {
    @SerializedName("a2_liste_oc_loc")
    private ExportFileDataDTO listeOcLoc;

    @SerializedName("a2_liste_pa_lpa")
    private ExportFileDataDTO listePaLpa;

    @SerializedName("general")
    private ExportGeneralDataDTO general;

}
