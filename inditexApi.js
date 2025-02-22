import axios from 'axios';

const INDITEX_API_URL = 'https://api.inditex.com/visualsearch/v1/search';
const INDITEX_API_KEY = '64a84aba-0b47-43ce-aca2-ae2c9222cb01';

export const searchVisual = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    const response = await axios.post(INDITEX_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${INDITEX_API_KEY}`,
      },
    });

    return response.data.products;
  } catch (error) {
    console.error('Errore durante la ricerca visiva:', error);
    throw error;
  }
};
