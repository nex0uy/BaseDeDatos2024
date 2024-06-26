import axiosInstance from './axiosConfig';

export const updateChampion = async (championTeamId, runnerUpTeamId) => {
    try{
        await axiosInstance.post('/tournament/updateChampion', null, {
            params: { championTeamId, runnerUpTeamId }
        });
    } catch (error) {
        throw new Error('Error update champion: ' + (error.response?.data?.message || error.message));
    }
};
