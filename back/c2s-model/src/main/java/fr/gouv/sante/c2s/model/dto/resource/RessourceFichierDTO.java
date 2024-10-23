package fr.gouv.sante.c2s.model.dto.resource;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RessourceFichierDTO {

    private Long id;
    @JsonIgnore
    private String uuid;
    private RessourceThematiqueDTO thematique;
    @JsonIgnore
    private String repertoire;
    private String nom;
    private Long taille;
    private String extension;
    private LocalDateTime dateCrea;
    private LocalDateTime dateMaj;

}
