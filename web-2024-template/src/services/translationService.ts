import axios from 'axios';

const API_KEY = 'AIzaSyBVKddnPDMrAPbO2acm29VYNGVJJfuxRps';
const TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await axios.post(TRANSLATE_URL, {}, {
      params: {
        q: text,
        target: targetLanguage,
        key: API_KEY,
      },
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return 'Translation error';
  }
};