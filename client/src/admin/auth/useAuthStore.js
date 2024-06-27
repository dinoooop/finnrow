import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';

const authUserFromStorage = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null
const tokenFromStorage = localStorage.getItem('token') ? localStorage.getItem('token') : null
const themeFromStorage = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'

const useAuthStore = create((set) => ({
    user: authUserFromStorage,
    token: tokenFromStorage,
    theme: themeFromStorage,
    loading: false,
    error: '',
    success: '',
    check: async () => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.get(`${config.api}/auth/check`, config.header());
            const user = response.data.user
        } catch (error) {
            localStorage.removeItem('authUser')
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
    },
    login: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.post(`${config.api}/auth/login`, data);
            localStorage.setItem('authUser', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.token)
            set({ loading: false, user: response.data.user })
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message ?? 'Server error',
                success: '',
            });
            throw error;
        }
    },
    logout: async (data) => {
        localStorage.removeItem('authUser');
        localStorage.removeItem('token');
        window.location.href = '/login';
    },
    register: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.post(`${config.api}/auth/register`, data);
            localStorage.setItem('authUser', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.token)
            set({ loading: false, user: response.data.user });
        } catch (error) {
            console.log(error.response);
            set({
                loading: false,
                error: error.response.data.message ?? 'Server error',
                success: '',
            });
            throw error;
        }
    },
    show: async () => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.get(`${config.api}/auth`, config.header())
            set({ loading: false, user: response.data.user });
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message ?? 'Server error',
                success: '',
            });
            throw error;
        }
    },
    forgotPassword: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.post(`${config.api}/auth/forgot-password`, data)
            set({ loading: false, success: response.data.message });
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message ?? 'Server error',
                success: '',
            });
            throw error;
        }
    },
    resetPassword: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.post(`${config.api}/auth/reset-password`, data)
            set({ loading: false, success: response.data.message });
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message ?? 'Server error',
                success: '',
            });
            throw error;
        }
    },
    update: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.post(`${config.api}/auth`, data, config.header())
            set({ loading: false, user: response.data.user });
            localStorage.setItem('authUser', JSON.stringify(response.data.user))
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message ?? 'Server error',
                success: '',
            });
            throw error;
        }
    },
    reset: () => set({
        error: '',
        success: '',
        loading: false
    })
}));

export default useAuthStore;