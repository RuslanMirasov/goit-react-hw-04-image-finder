import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38685778-b39595dc2d3e03e48621cd56d';

export const fetcImages = async (page, searchQuery) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page: page,
    },
  });
  return response.data;
};
