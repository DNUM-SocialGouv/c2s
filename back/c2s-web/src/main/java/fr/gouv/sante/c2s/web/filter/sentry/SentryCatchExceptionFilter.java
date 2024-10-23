package fr.gouv.sante.c2s.web.filter.sentry;

import fr.gouv.sante.c2s.web.filter.AbstractExceptionFilter;
import fr.gouv.sante.c2s.web.filter.FilterException;
import io.sentry.Sentry;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
@Order(1)
public class SentryCatchExceptionFilter extends AbstractExceptionFilter implements Filter {

    @Override
    protected FilterException[] getFilterExceptions(HttpServletRequest request) {
        return new FilterException[]{

        };
    }

    @Override
    protected void applyFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        try {
            filterChain.doFilter(servletRequest, servletResponse);
        } catch (Exception e) {
            Sentry.captureException(e.getCause());
            throw e;
        }
    }

}
