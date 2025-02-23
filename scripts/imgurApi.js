import axios from 'axios';

const IMGUR_CLIENT_ID = 'b044ef09a8a6bb7';

 */
export const uploadImageToImgur = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    const response = await axios.post('https://api.imgur.com/3/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
      },
    });

    if (response.data && response.data.data && response.data.data.link) {
      console.log('✅ URL público:', response.data.data.link);
      return response.data.data.link;
    } else {
      throw new Error('❌ Carga fallida');
    }
  } catch (error) {
    console.error('Error cargando en Imgur:', error);
    throw error;
  }
};
