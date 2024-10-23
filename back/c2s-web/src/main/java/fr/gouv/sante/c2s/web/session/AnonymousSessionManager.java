package fr.gouv.sante.c2s.web.session;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.apache.commons.lang3.tuple.Pair;

import java.util.Date;
import java.util.Optional;
import java.util.Stack;

public class AnonymousSessionManager {

    private static final String SIREN_INFORMATIONS = "c2s_siren_informations";
    private static final String TIME_MEASURING = "c2s_time_measuring";
    private static final Integer MAX_TIME_MEASURING_IN_THE_STACK = 10;
    private static final Integer MAX_SIREN_INFORMATIONS_IN_THE_STACK = 10;
    private static final Integer MINIMUM_SUBMISSION_TIME_IN_MILLISECONDS = 4000;

    public void saveSirenInfo(HttpServletRequest request, String siren, String label) {
        HttpSession session = request.getSession(true);

        Stack<Pair<String, String>> stack = (Stack<Pair<String, String>>) session.getAttribute(SIREN_INFORMATIONS);
        if (stack == null) {
            stack = new Stack<>();
        }

        if (stack.size()==MAX_SIREN_INFORMATIONS_IN_THE_STACK) {
            stack.pop();
        }

        stack.push(Pair.of(siren, label));

        session.setAttribute(SIREN_INFORMATIONS, stack);
    }

    public String getSirenInformations(HttpServletRequest request, String siren) {
        HttpSession session = request.getSession(false);
        if (session!=null) {
            Stack<Pair<String, String>> stack = (Stack<Pair<String, String>>) session.getAttribute(SIREN_INFORMATIONS);
            if (stack!=null && !stack.isEmpty()) {
                Optional<Pair<String, String>> pair = stack.stream().filter(it -> it.getKey().equals(siren)).findFirst();
                if (pair.isPresent())
                    return pair.get().getValue();
            }
        }
        return null;
    }

    public void startTimeMeasuring(HttpServletRequest request, String formKey) {
        HttpSession session = request.getSession(true);

        Stack<Pair<String, Long>> stack = (Stack<Pair<String, Long>>) session.getAttribute(TIME_MEASURING);
        if (stack == null) {
            stack = new Stack<>();
        }

        if (stack.size()==MAX_TIME_MEASURING_IN_THE_STACK) {
            stack.pop();
        }

        stack.removeIf(p-> p.getKey().equals(formKey));

        stack.push(Pair.of(formKey, new Date().getTime()));

        session.setAttribute(TIME_MEASURING, stack);
    }

    public boolean isValid(HttpServletRequest request, String formKey) {
        HttpSession session = request.getSession(false);
        if (session!=null && formKey!=null) {
            Stack<Pair<String, Long>> stack = (Stack<Pair<String, Long>>) session.getAttribute(TIME_MEASURING);

            if (stack!=null) {

                boolean b = stack.stream()
                        .filter(p -> p.getKey().equals(formKey))
                        //.peek(p -> System.out.println("dif "+(new Date().getTime() - p.getValue())))
                        .map(p -> (new Date().getTime() - p.getValue()) > MINIMUM_SUBMISSION_TIME_IN_MILLISECONDS)
                        .findFirst()
                        .orElse(false);

                return b;
            }
        }
        return false;
    }

}
