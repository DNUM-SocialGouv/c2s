package fr.gouv.sante.c2s.model.dto.export;

import com.google.gson.annotations.SerializedName;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ExportGeneralDataDTO {

    @SerializedName("script_societe_auteur")
    private String scriptSocieteAuteur;
    @SerializedName("script_societe_proprietaire")
    private String scriptSocieteProprietaire;
    @SerializedName("script_version")
    private String scriptVersion;
    @SerializedName("script_creation_date")
    private String scriptCreationDate;
    @SerializedName("script_execution_date")
    private Date scriptExecutionDate;
    @SerializedName("script_execution_uniqid")
    private String scriptExecutionUniqid;

}
