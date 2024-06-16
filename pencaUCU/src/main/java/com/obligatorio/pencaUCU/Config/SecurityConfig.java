package com.obligatorio.pencaUCU.Config;

import com.obligatorio.pencaUCU.Security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity in development
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/tournament/**").hasRole("ADMIN")
                .requestMatchers("/api/users/login", "/api/users/register", "/api/teams", "/api/finalPredictions").permitAll()
                .requestMatchers("/api/predictions/**").hasRole("USER") 
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .usernameParameter("email")
                .passwordParameter("password")
                .defaultSuccessUrl("/swagger-ui.html", true)
            )
            .cors(cors -> cors.configurationSource(corsConfigurationSource())); // Habilitar CORS
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> {
            String userQuery = "SELECT id, email, password FROM users WHERE email = ?";
            String roleQuery = "SELECT r.nombre FROM roles r JOIN users u ON r.id = u.role_id WHERE u.email = ?";

            List<CustomUserDetails> users = jdbcTemplate.query(connection -> {
                var preparedStatement = connection.prepareStatement(userQuery);
                preparedStatement.setString(1, email);
                return preparedStatement;
            }, new RowMapper<CustomUserDetails>() {
                @Override
                public CustomUserDetails mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
                    int userId = rs.getInt("id");
                    String username = rs.getString("email");
                    String password = rs.getString("password");
                    String roleName = jdbcTemplate.query(connection -> {
                        var preparedStatement = connection.prepareStatement(roleQuery);
                        preparedStatement.setString(1, email);
                        return preparedStatement;
                    }, new RowMapper<String>() {
                        @Override
                        public String mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
                            return rs.getString("nombre");
                        }
                    }).stream().findFirst().orElseThrow(() -> new UsernameNotFoundException("Rol no encontrado!"));
                    return new CustomUserDetails(userId, username, password, Collections.singleton(() -> "ROLE_" + roleName.toUpperCase()));
                }
            });

            if (users.isEmpty()) {
                throw new UsernameNotFoundException("Usuario no encontrado");
            }

            return users.get(0);
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new PlainTextPasswordEncoder(); // Use plain text password encoder
    }
}
