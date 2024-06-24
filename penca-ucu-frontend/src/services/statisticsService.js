import axiosInstance from './axiosConfig';

export const fetchUserRanking = async () => {
  try {
    const response = await axiosInstance.get('/statistics/userRanking');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user ranking');
  }
};

export const fetchFixture = async () => {
  try {
    const response = await axiosInstance.get('/matches/fixture');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching fixture');
  }
};

export const fetchAccuracyByCareer = async () => {
    try {
      const response = await axiosInstance.get('/statistics/accuracyByCareer');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching accuracy by career');
    }
  };