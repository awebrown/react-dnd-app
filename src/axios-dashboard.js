import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://gpa-dnd.firebaseio.com/'
});

export default instance;
