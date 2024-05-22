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

@Repository
public class UserDataAccess {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String INSERT_USER_SQL = "INSERT INTO users (name, email, password, role_id, career) VALUES (?, ?, ?, ?, ?)";
    private final String SELECT_USER_SQL = "SELECT * FROM users WHERE id = ?";
    private final String SELECT_ALL_USERS_SQL = "SELECT * FROM users";

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
