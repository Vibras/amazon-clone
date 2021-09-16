import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-d53f0/us-central1/api)' // API URL (cloud function URL)
});

export default instance;