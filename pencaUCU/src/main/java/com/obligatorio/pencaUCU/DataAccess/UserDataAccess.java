package com.obligatorio.pencaUCU.DataAccess;

import com.obligatorio.pencaUCU.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class UserDataAccess {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String INSERT_USER_SQL = "INSERT INTO users (name, email, password, role_id, career) VALUES (?, ?, ?, ?, ?)";
    private final String SELECT_USER_SQL = "SELECT * FROM users WHERE id = ?";
    private final String SELECT_ALL_USERS_SQL = "SELECT * FROM users";
    private final String SELECT_USERS_WITH_POINTS_SQL = "SELECT u.id, u.name, u.email, u.registration_date, u.role_id, u.career, " +
            "COALESCE(SUM(p.points), 0) + COALESCE(SUM(fp.points), 0) AS points " +
            "FROM users u " +
            "LEFT JOIN predictions p ON u.id = p.user_id " +
            "LEFT JOIN final_predictions fp ON u.id = fp.user_id " +
            "GROUP BY u.id, u.name, u.email, u.registration_date, u.role_id, u.career";

    public void save(User user) {
        jdbcTemplate.update(INSERT_USER_SQL,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getRoleId(),
                user.getCareer());
    }

    public User findById(int id) {
        return jdbcTemplate.queryForObject(SELECT_USER_SQL, new UserRowMapper(), id);
    }

    public List<User> findAll() {
         return jdbcTemplate.query(SELECT_ALL_USERS_SQL, new UserRowMapper());
    }

    public List<Map<String, Object>> findAllWithPoints() {
        return jdbcTemplate.queryForList(SELECT_USERS_WITH_POINTS_SQL);
    }

    private static final class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setRegistrationDate(rs.getTimestamp("registration_date"));
            user.setRoleId(rs.getInt("role_id"));
            user.setCareer(rs.getString("career"));
            return user;
        }
    }
}
