import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
  const { latLong, limit } = req.query;
  try {
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200).json({ data: { coffeeStores: response.length, response } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
};

export default getCoffeeStoresByLocation;
