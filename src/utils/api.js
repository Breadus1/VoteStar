import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const registerCompany = (companyData) => api.post('/companies', companyData);
export const login = (credentials) => api.post('/companies/login', credentials);
export const fetchGames = () => api.get('/games');
export const voteForGame = (gameId) => api.post(`/games/vote/${gameId}`);

export default api;
