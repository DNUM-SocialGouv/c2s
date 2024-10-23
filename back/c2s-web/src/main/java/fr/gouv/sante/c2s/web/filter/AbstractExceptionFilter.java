package fr.gouv.sante.c2s.web.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public abstract class AbstractExceptionFilter implements Filter {

    protected abstract void applyFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException;
    protected abstract FilterException[] getFilterExceptions(HttpServletRequest request);

    protected boolean matchException(HttpServletRequest request) {
        FilterException[] exceptions = getFilterExceptions(request);
        if (exceptions!=null) {
            for (FilterException exception : exceptions) {
                //System.out.println("URI : "+request.getRequestURI()+" - - "+exception.getUri());
                if (exception.getType()==FilterExceptionTypeEnum.EQUALS
                        && exception.getMethod().equalsIgnoreCase(request.getMethod())
                        && request.getRequestURI().equals(exception.getUri())) {
                    //System.out.println("OK 1");
                    return true;
                } else if (exception.getType()==FilterExceptionTypeEnum.START_WITH
                        && exception.getMethod().equals("*")
                        && request.getRequestURI().startsWith(exception.getUri())) {
                    //System.out.println("OK 2");
                    return true;
                }
            }
        }
        //System.out.println("KO");
        return false;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        if (matchException((HttpServletRequest) servletRequest)) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            applyFilter(servletRequest, servletResponse, filterChain);
        }
    }
}
