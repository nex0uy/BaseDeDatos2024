package com.obligatorio.pencaUCU.Config;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

public class JwtConfig {
    public static final Key SUPER_SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
}
