import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create();
export const axiosMockAdapterInstance= new AxiosMockAdapter(axiosMockInstance, { delayResponse: 1000 });
export default false ? axiosMockInstance : axiosLiveInstance;