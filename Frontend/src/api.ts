import axios from 'axios';
import type { Song, Stats } from './types';

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api' });
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL); // Debug log
export const fetchSongs = () => API.get<Song[]>('/songs');
export const createSong = (newSong: Omit<Song, '_id'>) => API.post<Song>('/songs', newSong);
export const updateSong = (id: string, updatedSong: Omit<Song, '_id'>) => API.put<Song>(`/songs/${id}`, updatedSong);
export const deleteSong = (id: string) => API.delete(`/songs/${id}`);
export const fetchStats = () => API.get<Stats>('/songs/stats');