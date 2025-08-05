package OMR.teamProject.OMR.User.Token;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {
	private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    public String createToken(String userId) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("type", "access");

        Date now = new Date();
        Date validity = new Date(now.getTime() + 1000 * 60 * 60); //1시간

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key)
                .compact();
    }
    
    public String createPasswordResetToken(String userId) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("type", "passwordReset");

        Date now = new Date();
        Date validity = new Date(now.getTime() + 1000 * 60 * 30); // 30분

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key)
                .compact();
    }
    
    public String getUserIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    public String getTokenType(String token) {
        Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        return (String) claims.get("type");
    }
    
}
