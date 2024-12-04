import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Grid, 
  Paper
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import { translateText } from "../services/translationService";


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

const TranslatePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleTranslate = async () => {
    const translation = await translateText(inputText, targetLanguage);
    setTranslatedText(translation);
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      {menuOpen && (
        <Box
          sx={{
            width: 250,
            bgcolor: "#FDF1F1",
            p: 2,
            height: "100vh",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <List>
            {[
              { text: "Home", page: "home" },
              { text: "Conversion Tool", page: "conversion" },
              { text: "Translator", page: "translate" },
              { text: "Expense Tracker", page: "expense-tracker" },
              { text: "Extracurriculars", page: "extracurriculars" },
              { text: "Cultural Recs", page: "cultural-recs" },
            ].map((item, index) => (
              <ListItem
                key={index}
                onClick={() => onNavigate(item.page)}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <StarIcon sx={{ color: "#F3B8B8", marginRight: 1 }} />
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Main Content */}
      <Box flexGrow={1}>
        {/* Header */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#F7BFBF",
            height: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Tourist Converter
            </Typography>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Translate Functionality */}
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Translate Text
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTranslate}
                  fullWidth
                >
                  Translate
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    height: "100%",
                    minHeight: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "center", color: "#333" }}
                  >
                    {translatedText || "Translation will appear here..."}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Translation Image */}
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
          <img
            src="./images/Translation.jpg"
            alt="Translation"
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default TranslatePage;