import axios from 'axios';

const getAuthToken = async () => {
  const AUTH_URL = 'https://auth.inditex.com:443/openam/oauth2/itxid/itxidmp/sandbox/access_token';

  const authData = new URLSearchParams();
  authData.append('scope', 'technology.catalog.read');
  authData.append('grant_type', 'client_credentials');

  const authHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa('oauth-mkpsbox-oauthqnxqwxuhzzcfqozgqasnbxpro:rJVFzB-{h86/~HSw'),
  };

  try {
    const response = await axios.post(AUTH_URL, authData, { headers: authHeaders });
    console.log('✅ id_token recibido:', response.data.id_token);
    return response.data.id_token;
  } catch (error) {
    console.error('❌ Error al solicitar el token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const searchVisual = async (imageUrl) => {
  try {
    const idToken = await getAuthToken();

    const PRODUCT_SEARCH_URL = `https://api-sandbox.inditex.com/pubvsearch-sandbox/products?image=${encodeURIComponent(imageUrl)}`;

    const headers = {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.get(PRODUCT_SEARCH_URL, { headers });

    if (response.data && response.data.length > 0) {
      console.log('📊 productos recibidos:', response.data);
      return response.data;
    } else {
      console.warn('⚠️ No hay productos encontrados.');
      return [];
    }
  } catch (error) {
    console.error('❌ Error durante la búsqueda visual:', error.response ? error.response.data : error.message);
    throw error;
  }
};
