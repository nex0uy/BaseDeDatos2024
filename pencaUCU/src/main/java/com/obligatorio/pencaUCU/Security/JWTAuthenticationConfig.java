package com.obligatorio.pencaUCU.Security;

import io.jsonwebtoken.Jwts;
import com.obligatorio.pencaUCU.Config.JwtConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.GrantedAuthority;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class JWTAuthenticationConfig {

    private static final long TOKEN_EXPIRATION_TIME = 86400000; // 1 día en milisegundos

    public String getJWTToken(String username) {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");

        String token = Jwts.builder()
            .setId("espinozajgeJWT")
            .setSubject(username)
            .claim("authorities", grantedAuthorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()))
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
            .signWith(JwtConfig.SUPER_SECRET_KEY)
            .compact();

        return "Bearer " + token;
    }
}
