import api from "./axios";

  export const getIncidentsData = async () => {
  const response = await api.get('/incident/get-incidents');
  return response.data;
};

export const creteIncidentRequest = async (data: any) => {
    const response = await api.post('/incident/create-incident', data);
    return response.data;
};

export const getIncident = async (id: string) => {
  const response = await api.get(`incident/get-incident/${id}`);
  return response.data
}