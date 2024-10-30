import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Select, MenuItem } from '@mui/material';
import { translateText } from '../services/translationService';

// Comprehensive list of languages with their codes
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ur', name: 'Urdu' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'ms', name: 'Malay' },
  { code: 'id', name: 'Indonesian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'el', name: 'Greek' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'cs', name: 'Czech' },
  { code: 'sv', name: 'Swedish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'da', name: 'Danish' },
  { code: 'he', name: 'Hebrew' },
  { code: 'ro', name: 'Romanian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'sr', name: 'Serbian' },
  { code: 'hr', name: 'Croatian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lv', name: 'Latvian' },
  { code: 'et', name: 'Estonian' },
  { code: 'is', name: 'Icelandic' },
  { code: 'ga', name: 'Irish' },
  { code: 'mt', name: 'Maltese' },
  { code: 'cy', name: 'Welsh' },
  { code: 'sq', name: 'Albanian' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'ka', name: 'Georgian' },
  { code: 'hy', name: 'Armenian' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'my', name: 'Burmese' },
  { code: 'km', name: 'Khmer' },
  { code: 'lo', name: 'Lao' },
  { code: 'si', name: 'Sinhala' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ne', name: 'Nepali' },
  { code: 'am', name: 'Amharic' },
  { code: 'sw', name: 'Swahili' },
  // Add more languages as needed
];

const TranslatePage = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish

  const handleTranslate = async () => {
    const translation = await translateText(inputText, targetLanguage);
    setTranslatedText(translation);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Translate Text
        </Typography>
        <TextField
          fullWidth
          label="Text to Translate"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Select
          fullWidth
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={handleTranslate}>
          Translate
        </Button>
        {translatedText && (
          <Typography variant="h6" component="p" sx={{ mt: 2 }}>
            Translated Text: {translatedText}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default TranslatePage;