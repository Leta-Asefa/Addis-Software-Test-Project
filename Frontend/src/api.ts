import axios from 'axios';
import type { Song, Stats } from './types';

const API = axios.create({ baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

export const fetchSongs = () => API.get<Song[]>('/songs');
export const createSong = (newSong: Omit<Song, '_id'>) => API.post<Song>('/songs', newSong);
export const updateSong = (id: string, updatedSong: Omit<Song, '_id'>) => API.put<Song>(`/songs/${id}`, updatedSong);
export const deleteSong = (id: string) => API.delete(`/songs/${id}`);
export const fetchStats = () => API.get<Stats>('/songs/stats');