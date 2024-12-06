package fr.gouv.sante.c2s.service.jwt;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

@Slf4j
@Service
public class JwtService {

    private static final Integer MAX_TOKEN = 200;
    private Map<String, Calendar> RESET_PASSWORD_TOKENS;
    private String secretKey;

    public JwtService() {
        this.RESET_PASSWORD_TOKENS = new ConcurrentHashMap<>();
        SecureRandom random = new SecureRandom();
        byte[] keyBytes = new byte[64];
        random.nextBytes(keyBytes);
        this.secretKey = Base64.getEncoder().encodeToString(keyBytes);
    }

    public String createToken(String email) {
        Calendar older = new GregorianCalendar();
        AtomicReference<String> olderToken = new AtomicReference<>("");
        String uuid = getToken(email);
        if (RESET_PASSWORD_TOKENS.size()==MAX_TOKEN) {
            RESET_PASSWORD_TOKENS.entrySet().forEach(it -> {
                if (it.getValue().before(older)) {
                    older.setTime(it.getValue().getTime());
                    olderToken.set(it.getKey());
                }
            });
        }
        if (!olderToken.get().isEmpty()) {
            RESET_PASSWORD_TOKENS.remove(olderToken.get());
        }
        RESET_PASSWORD_TOKENS.put(uuid, Calendar.getInstance());
        return uuid;
    }

    public boolean isValidToken(String token) {
        if (RESET_PASSWORD_TOKENS.containsKey(token)) {
            Calendar calendar = RESET_PASSWORD_TOKENS.get(token);
            calendar.add(Calendar.MINUTE, 120);
            Calendar now = new GregorianCalendar();
            return calendar.after(now);
        }
        return false;
    }

    public String getToken(String email) {
        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.MINUTE, 120);
        return Jwts.builder().subject(email)
                .expiration(calendar.getTime())
                .issuer("espaceConnect")
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();

    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = this.secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getEmailFromToken(String token) {
        try {
            JwtParser jwtParser = Jwts.parser().verifyWith(new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName())).build();
            return jwtParser.parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e) {
            log.error(e.getMessage());
            //e.printStackTrace();
            return null;
        }
    }

}
