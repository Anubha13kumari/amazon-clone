import axios from "axios";


const instance= axios.create({
    baseURL: 'http://localhost:5001/clone-4f7d0/us-central1/api' // the Api(cloud function) Url
});

export default instance;