import axios from 'axios';
import axiosInstance from './axiosConfig';


const API_URL = 'http://localhost:8080/api/teams';

export const fetchTeams = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching teams');
  }
};

export const addTeam = async (name) => {
  const response = await axiosInstance.post('/teams', { name });
  return response.data;
};

export const updateTeam = async (id, name) => {
  const response = await axiosInstance.put(`/teams/${id}`, { name });
  return response.data;
};

export const deleteTeam = async (id) => {
  await axiosInstance.delete(`/teams/${id}`);
};