import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Card, CardContent, Divider } from '@mui/material';
import { fetchFixture } from '../services/statisticsService';
import { fetchTeams } from '../services/teamService';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Fixture = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const [teamsData, matchesData] = await Promise.all([fetchTeams(), fetchFixture()]);
        const teamsMap = teamsData.reduce((acc, team) => {
          acc[team.id] = team.name;
          return acc;
        }, {});
        const mappedMatches = matchesData.map(match => ({
          ...match,
          teamOneName: teamsMap[match.teamOneId] || 'Team One',
          teamTwoName: teamsMap[match.teamTwoId] || 'Team Two'
        }));
        setTeams(teamsMap);
        setMatches(mappedMatches);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      }
    };
    getData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Fixture
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <List>
          {matches.map((match, index) => (
            <StyledCard key={match.id}>
              <CardContent>
                <ListItem>
                  <ListItemText 
                    primary={`${match.teamOneName} vs ${match.teamTwoName}`} 
                    secondary={`Date: ${new Date(match.date).toLocaleString()}`} 
                  />
                </ListItem>
                {index < matches.length - 1 && <Divider />}
              </CardContent>
            </StyledCard>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Fixture;
