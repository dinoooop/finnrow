import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';

const stDataLocal = localStorage.getItem('st_data') ? JSON.parse(localStorage.getItem('st_data')) : null;

const useStStore = create((set) => ({
    stData: stDataLocal,
    error: '',
    getStock: async (data = {}) => {
        try {
            const response = await axios.get(`${config.api}/st/regular`);
            localStorage.setItem('st_data', JSON.stringify(response.data))
            set({ stData: response.data });
        } catch (error) {
            set({
                error: error.response.data.message ?? 'Server error'
            });
        }
    },
}));

export default useStStore;