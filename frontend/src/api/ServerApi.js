import axios from 'axios';

export const FRONT_PATH = "http://localhost:3000"
export const BASE_PATH = "http://localhost:3001"


export const API = axios.create({
    baseURL: "http://localhost:3001"
});

export const getSkills = async () => {
    return (await API.get("/api/skills")).data
}