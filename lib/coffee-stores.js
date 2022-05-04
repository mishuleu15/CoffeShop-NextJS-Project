import { createApi } from 'unsplash-js';

// on your node server
export const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStores = async (
  latLong = '43.65267326999575,-79.39545615725015',
  limit = 20
) => {
  const photos = await fetchPhotos();
  const response = await fetch(
    getUrlForCoffeeStores(latLong, 'coffee stores', limit),
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    }
  );

  const data = await response.json();
  return data.results.map((result, idx) => {
    return {
      ...result,
      imgUrl: photos[idx],
    };
  });
};

export const fetchPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',

    perPage: 40,
  });

  const unsplashResults = photos.response.results;
  const photosResponse = unsplashResults.map((result) => result.urls['small']);
  return photosResponse;
};
