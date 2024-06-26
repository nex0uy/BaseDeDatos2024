import axiosInstance from './axiosConfig';

export const fetchMatches = async () => {
  const response = await axiosInstance.get('/matches');
  return response.data;
};

export const addMatch = async (match) => {
  try {
    const response = await axiosInstance.post('/matches', match);
    return response.data;
  } catch (error) {
    throw new Error('Error adding match: ' + (error.response?.data?.message || error.message));
  }
};

export const updateMatch = async (id, match) => {
  try {
    const response = await axiosInstance.put(`/matches/${id}`, match);
    return response.data;
  } catch (error) {
    throw new Error('Error updating match: ' + (error.response?.data?.message || error.message));
  }
};

export const deleteMatch = async (id) => {
  await axiosInstance.delete(`/matches/${id}`);
};
