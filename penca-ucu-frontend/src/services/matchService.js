import axiosInstance from './axiosConfig';

export const fetchMatches = async () => {
  try {
    const response = await axiosInstance.get('/matches');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching matches');
  }
};
