import axious from 'axios';

/**
 * Create connection to the REST API.
 */
export default axious.create({
    baseURL: 'http://localhost:3000'
});