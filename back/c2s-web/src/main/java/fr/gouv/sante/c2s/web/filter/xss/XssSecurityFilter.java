package fr.gouv.sante.c2s.web.filter.xss;

import fr.gouv.sante.c2s.security.SecurityService;
import fr.gouv.sante.c2s.web.filter.AbstractExceptionFilter;
import fr.gouv.sante.c2s.web.filter.FilterException;
import fr.gouv.sante.c2s.web.filter.FilterExceptionTypeEnum;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
@Order(3)
public class XssSecurityFilter extends AbstractExceptionFilter implements Filter {

    @Autowired
    SecurityService securityService;

    @Override
    protected FilterException[] getFilterExceptions(HttpServletRequest request) {
        return new FilterException[]{
                // post file ressource
                new FilterException("POST", request.getContextPath()+"/moderateur/fichiers", FilterExceptionTypeEnum.EQUALS),
                // texte riche du message d accueil
                new FilterException("POST", request.getContextPath()+"/moderateur/message", FilterExceptionTypeEnum.EQUALS),
                // token text/plain
                new FilterException("POST", request.getContextPath()+"/public/login", FilterExceptionTypeEnum.EQUALS),
                // swagger
                new FilterException("*", "/api/v3/", FilterExceptionTypeEnum.START_WITH),
                // debug
                new FilterException("*", "/api/debug", FilterExceptionTypeEnum.START_WITH),
                // request reset password
                new FilterException("POST", request.getContextPath()+"/public/request-reset-password", FilterExceptionTypeEnum.EQUALS),
                // reset password
                new FilterException("POST", request.getContextPath()+"/public/reset-password", FilterExceptionTypeEnum.EQUALS)

        };
    }

    @Override
    protected void applyFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        //log.info("["+request.getMethod()+"] "+request.getRequestURI()+(request.getContentType()!=null ? " ("+request.getContentType()+")" : ""));

        boolean isGetMethod = request.getMethod().equalsIgnoreCase("GET");
        boolean isJsonContentType = request.getContentType()!=null && request.getContentType().toLowerCase().contains("json");

        if (matchException(request)) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else if (!isGetMethod || isJsonContentType)
            filterChain.doFilter(new XssHttpServletRequestWrapper(request, securityService), servletResponse);
        else {
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }

}
