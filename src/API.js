import axios from 'axios';

const key = '37349612-6a9d2bc1c1c870fef97dab380';

export const fetchImages = async (searchQuery, page) => {
  const url = `https://pixabay.com/api/?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;
  const response = await axios.get(url);
  return response.data.hits;
};
