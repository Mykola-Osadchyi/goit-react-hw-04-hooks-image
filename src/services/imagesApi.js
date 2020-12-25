const API_KEY = '18724736-77330c9d8a28eb7073d2e9b7d';

const fetchImages = (query, page) => {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Oops.. error'));
  });
};

export default fetchImages;
