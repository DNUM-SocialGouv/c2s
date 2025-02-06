package fr.gouv.sante.c2s.web.filter.role;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.filter.AbstractExceptionFilter;
import fr.gouv.sante.c2s.web.filter.FilterException;
import fr.gouv.sante.c2s.web.filter.FilterExceptionTypeEnum;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
@Order(5)
public class RoleSecurityFilter extends AbstractExceptionFilter implements Filter {

    @Autowired
    MembreSessionManager sessionManager;

    @Override
    protected FilterException[] getFilterExceptions(HttpServletRequest request) {
        return new FilterException[] {
            new FilterException("*", "/api/v3/", FilterExceptionTypeEnum.START_WITH),
            new FilterException("*", "/api/debug/", FilterExceptionTypeEnum.START_WITH)
        };
    }

    @Override
    protected void applyFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response = (HttpServletResponse)servletResponse;
        String contextPath = request.getContextPath();
        String requestUri = request.getRequestURI();

        MembreSessionDTO user = sessionManager.getMembre(request);

        // check roles
        boolean isModerateurUser = user!=null && user.getGroupe()== GroupeEnum.MODERATEUR;
        boolean isOcUser = user!=null && user.getGroupe()==GroupeEnum.ORGANISME_COMPLEMENTAIRE;
        boolean isCaisseUser = user!=null && user.getGroupe()==GroupeEnum.CAISSE;
        boolean isPartenaireUser = isOcUser || isCaisseUser;

        // URL type
        boolean isModerateurUrl = requestUri.startsWith(contextPath+"/"+WebConstants.MODERATEUR_PREFIX_URL);
        boolean isOcUrl = requestUri.startsWith(contextPath+"/"+WebConstants.OC_PREFIX_URL);
        boolean isCaisseUrl = requestUri.startsWith(contextPath+"/"+WebConstants.CAISSE_PREFIX_URL);
        boolean isPartenaireUrl = requestUri.startsWith(contextPath+"/"+WebConstants.PARTENAIRE_PREFIX_URL);
        boolean isPublicUrl = requestUri.startsWith(contextPath+"/"+WebConstants.PUBLIC_PREFIX_URL);

        // matching
        boolean matcheRule = isPublicUrl
                || (isModerateurUrl && isModerateurUser)
                || (isOcUrl && isOcUser)
                || (isCaisseUrl && isCaisseUser)
                || (isPartenaireUrl && isPartenaireUser);

        if (matcheRule) { // pass
            //log.debug("PASSED ["+request.getMethod()+"] "+requestUri);
            filterChain.doFilter(servletRequest, servletResponse);
        } else { // 401
            log.info("UNAUTHORIZED ["+request.getMethod()+"] "+requestUri);
            request.getRequestDispatcher("/unauthorized").forward(request, response);
        }
    }

}
