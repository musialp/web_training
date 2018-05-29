import axios from 'axios';

const axiosOrders = axios.create({
    baseURL: 'https://react-burger-builder-5a73f.firebaseio.com/',

})

export default axiosOrders;
