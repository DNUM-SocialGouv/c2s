package fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.create;

import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.jwt.JwtService;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.AbstractModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.IModerateurCommand;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CreateModerateurEmailCommand extends AbstractModerateurCommand implements IModerateurCommand {

    @Value("${reset.url}")
    private String baseUrl;

    private EmailBusinessService emailBusinessService;
    private JwtService jwtService;
    private Mapper mapper;

    public CreateModerateurEmailCommand(EmailBusinessService emailBusinessService,
                                        JwtService jwtService,
                                        Mapper mapper) {
        this.emailBusinessService = emailBusinessService;
        this.jwtService = jwtService;
        this.mapper = mapper;
    }

    @Override
    protected ModerateurDTO executeWrapped(ModerateurDTO moderateurDTO, MembreSessionDTO membreSessionDTO) {
        String token = jwtService.createToken(moderateurDTO.getEmail());
        emailBusinessService.sendMailInvitationModerateur(baseUrl, mapper.mapMembreToModerateurEntity(moderateurDTO), token);
        return moderateurDTO;
    }

    @Override
    protected String getExceptionMessage() {
        return "envoi du mail";
    }

    @Override
    protected void rollbackWrapped(ModerateurDTO dto) {
        // nothing
    }
}
