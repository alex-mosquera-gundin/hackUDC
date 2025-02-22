import axios from 'axios';
import { INDITEX_API_KEY, INDITEX_API_URL } from '@env';

export const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${INDITEX_API_URL}/${productId}`, {
      headers: {
        'Authorization': `Bearer ${INDITEX_API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Errore nella chiamata API:', error);
    throw error;
  }
};
