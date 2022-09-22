import axios from 'axios';
import useAuth from '../hooks/useAuth';

const BASE_URL = 'http://localhost:3000';


export default axios.create({
    baseURL: BASE_URL
});


