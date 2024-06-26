import axiosInstance from './axiosConfig';

export const fetchPredictionsByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/predictions/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error prediction!');
  }
};

export const submitPrediction = async (prediction) => {
  try {
    const response = await axiosInstance.post('/predictions', prediction);
    return response.data;
  } catch (error) {
    throw new Error('Error  prediction: ' + (error.response?.data?.message || error.message));
  }
};

export const updatePrediction = async (id, prediction) => {
  try {
    const response = await axiosInstance.put(`/predictions/${id}`, prediction);
    return response.data;
  } catch (error) {
    throw new Error('Error  prediction: ' + (error.response?.data?.message || error.message));
  }
};
