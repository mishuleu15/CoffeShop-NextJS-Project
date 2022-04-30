import { createApi } from 'unsplash-js';

// on your node server
export const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

export const fetchCoffeeStores = async () => {
  const photos = await fetchPhotos();
  const response = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575,-79.39545615725015&query=coffee&limit=8`,
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

    perPage: 10,
  });

  const unsplashResults = photos.response.results;
  const photosResponse = unsplashResults.map((result) => result.urls['small']);
  return photosResponse;
};
