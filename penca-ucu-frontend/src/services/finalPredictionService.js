import axiosInstance from './axiosConfig';

export const fetchFinalPredictionByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/finalPredictions/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching final prediction');
  }
};
