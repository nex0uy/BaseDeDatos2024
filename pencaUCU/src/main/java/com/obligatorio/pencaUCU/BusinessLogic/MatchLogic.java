package com.obligatorio.pencaUCU.BusinessLogic;

import com.obligatorio.pencaUCU.DataAccess.MatchDataAccess;
import com.obligatorio.pencaUCU.Models.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchLogic {

    @Autowired
    private MatchDataAccess matchDataAccess;

    public void saveMatch(Match match) {
        matchDataAccess.save(match);
    }

    public Match getMatchById(int id) {
        return matchDataAccess.findById(id);
    }

    public List<Match> getAllMatches() {
        return matchDataAccess.findAll();
    }

    public void updateMatch(Match match) {
        matchDataAccess.update(match);
    }

    public void deleteMatch(int id) {
        matchDataAccess.delete(id);
    }
}
