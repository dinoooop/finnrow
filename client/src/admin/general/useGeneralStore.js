import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';

const stockFromStorage = localStorage.getItem('stock') ? JSON.parse(localStorage.getItem('stock')) : null;

const useGeneralStore = create((set) => ({
    stock: stockFromStorage,
    getStock: async (data = {}) => {
        try {
            const response = await axios.get(`${config.api}/select-regular`);
            set({ stock: response.data });
        } catch (error) {
            set({
                error: error.response.data.message ?? 'Server error'
            });
        }
    },
}));

export default useGeneralStore;