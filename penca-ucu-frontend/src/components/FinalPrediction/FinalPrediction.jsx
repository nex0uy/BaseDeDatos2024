import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormGroup, Label, Select } from '../../assets/component-styles/FinalPrediction.styles';

const FinalPrediction = ({ onPredictionChange }) => {
  const [teams, setTeams] = useState([]);
  const [champion, setChampion] = useState('');
  const [runnerUp, setRunnerUp] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/teams');
        if (Array.isArray(response.data)) {
          setTeams(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    onPredictionChange({ champion, runnerUp });
  }, [champion, runnerUp, onPredictionChange]);

  return (
    <FormGroup>
      <Label>Campeón</Label>
      <Select value={champion} onChange={(e) => setChampion(e.target.value)}>
        <option value="">Seleccionar Equipo</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </Select>
      <Label>Subcampeón</Label>
      <Select value={runnerUp} onChange={(e) => setRunnerUp(e.target.value)}>
        <option value="">Seleccionar Equipo</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </Select>
    </FormGroup>
  );
};

export default FinalPrediction;
