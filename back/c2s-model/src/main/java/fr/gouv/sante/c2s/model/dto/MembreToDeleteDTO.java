package fr.gouv.sante.c2s.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MembreToDeleteDTO {
    private Long membreId;
    private String email;
}
