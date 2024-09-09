import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // URL вашего Django API

export const getTransactions = async () => {
    const response = await axios.get(`${API_URL}transactions/`);
    return response.data;
};

export const createTransaction = async (transaction) => {
    const response = await axios.post(`${API_URL}transactions/create/`, transaction);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}categories/`);
    return response.data;
};

export const createCategories = async () => {
    const response = await axios.get(`${API_URL}categories/create`);
    return response.data;
};