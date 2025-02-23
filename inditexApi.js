import axios from 'axios';

const IMGUR_CLIENT_ID = 'b044ef09a8a6bb7';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadImageToImgur = async (imageUri, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });

      const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.data && response.data.data.link) {
        console.log('✅ Imagen caricatura de Imgur:', response.data.data.link);
        return response.data.data.link;
      } else {
        console.warn('⚠️ Error durante la carga en el dispositivo.');
        return null;
      }

    } catch (error) {
      if (error.response && error.response.status === 429 && attempt < retries) {
        console.warn(`⚠️ Límite de velocidad excedido. Repaso en 3 segundos... (Intento ${attempt})`);
        await delay(3000);
      } else {
        console.error('❌ Errore durante il caricamento su Imgur:', error);
        throw error;
      }
    }
  }
};

export const searchVisual = async (imageUrl) => {
  try {
    const INDITEX_API_URL = 'https://api.inditex.com/visual-search/v1';
    const INDITEX_API_KEY = 'eyJ0eXAiOiJKV1QiLCJraWQiOiJZMjZSVjltUFc3dkc0bWF4NU80bDBBd2NpSVE9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiUkJWMUp2S3dmNENENS1TdWR2YkkzQSIsInN1YiI6Im9hdXRoLW1rcHNib3gtb2F1dGhxbnhxd3h1aHp6Y2Zxb3pncWFzbmJ4cHJvIiwiYXVkaXRUcmFja2luZ0lkIjoiYmMxODIwODItNTlmYy00OTYyLWI5ZTQtMTIyMDg4ODYxMGUxLTEyNTg3NzMyMCIsImN1c3RvbSI6eyJjb25zdW1lck9yZ0lkIjoidml0dWNjaS5jaHJpc3RpYW5fZ21haWwuY29tIiwibWFya2V0cGxhY2VDb2RlIjoib3Blbi1kZXZlbG9wZXItcG9ydGFsIiwibWFya2V0cGxhY2VBcHBJZCI6IjY0YTg0YWJhLTBiNDctNDNjZS1hY2EyLWFlMmM5MjIyY2IwMSJ9LCJpc3MiOiJodHRwczovL2F1dGguaW5kaXRleC5jb206NDQzL29wZW5hbS9vYXV0aDIvaXR4aWQvaXR4aWRtcC9zYW5kYm94IiwidG9rZW5OYW1lIjoiaWRfdG9rZW4iLCJ1c2VySWQiOiJvYXV0aC1ta3BzYm94LW9hdXRocW54cXd4dWh6emNmcW96Z3Fhc25ieHBybyIsImF1ZCI6Im9hdXRoLW1rcHNib3gtb2F1dGhxbnhxd3h1aHp6Y2Zxb3pncWFzbmJ4cHJvIiwiaWRlbnRpdHlUeXBlIjoic2VydmljZSIsImF6cCI6Im9hdXRoLW1rcHNib3gtb2F1dGhxbnhxd3h1aHp6Y2Zxb3pncWFzbmJ4cHJvIiwiYXV0aF90aW1lIjoxNzQwMjY4NDg4LCJzY29wZSI6Im1hcmtldCB0ZWNobm9sb2d5LmNhdGFsb2cucmVhZCBvcGVuaWQiLCJyZWFsbSI6Ii9pdHhpZC9pdHhpZG1wL3NhbmRib3giLCJ1c2VyVHlwZSI6ImV4dGVybmFsIiwiZXhwIjoxNzQwMjcyMDkwLCJ0b2tlblR5cGUiOiJKV1RUb2tlbiIsImlhdCI6MTc0MDI2ODQ4OCwiYXV0aExldmVsIjoiMSJ9.YoLa01QdIZYuExBQOCqeeUJ2bmMp0RjGyBJrtoKTSREic-tgQC6Fl5JG5JlKwDn9DoViAsaPYNSY8f3ygY6JsjfU9NsjZnFuiLQq4IfghjGYCmmk6RnvDnKSdV3XRmiTWr7XqHIebIOiF2u7w5HyRCxJGWO7J11yMkKMR2uqHnItg7A0R8Tpi43wzcKUWa8TZ53AljatFqXJIe-jy00_3PZwMWT0tycvvHtPfpi097wpP2lm5nhkU7F2tP2ppf3aDIWwK-k5UQBp8FRtvolqBCuEoUuQ02pSVb1huR6qPd-Gnx7bn01XlKRDeFvWpTmzfmEZpCDu9ZvOVklXvk-WVA';

    const response = await axios.get(`${INDITEX_API_URL}?image_url=${encodeURIComponent(imageUrl)}`, {
      headers: {
        'Authorization': `Bearer ${INDITEX_API_KEY}`,
      },
    });

    if (response.data && response.data.products) {
      console.log('✅ productos encontrados:', response.data.products);
      return response.data.products;
    } else {
      console.warn('⚠️ No hay productos encontrados.');
      return [];
    }
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error('❌ Límite de tasa excedido en Inditex API.');
    } else {
      console.error('❌ Error durante la búsqueda visual:', error);
    }
    throw error;
  }
};
