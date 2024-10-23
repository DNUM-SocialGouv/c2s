package fr.gouv.sante.c2s.javamail;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MailProperties {

    private String from;
    private String bcc;

}
