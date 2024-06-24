import axios from 'axios';

const API_URL = 'http://localhost:8080/api/teams';

export const fetchTeams = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching teams');
  }
};
