import { getSpecialRequests, addSpecialRequest } from '../models/SpecialRequest.js';

const getAllSpecialRequests = async () => {
  return await getSpecialRequests();
};

const createSpecialRequest = async (request) => {
  return await addSpecialRequest(request);
};

export { getAllSpecialRequests, createSpecialRequest };