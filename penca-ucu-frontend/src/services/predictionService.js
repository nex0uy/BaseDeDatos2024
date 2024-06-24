import axiosInstance from './axiosConfig';

export const submitPrediction = async (prediction) => {
  try {
    const response = await axiosInstance.post('/predictions', prediction);
    return response.data;
  } catch (error) {
    throw new Error('Error submitting prediction: ' + (error.response?.data?.message || error.message));
  }
};
