import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  CircularProgress
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import { supabase } from "../services/supabaseClient";

// List of countries
const countries = [
  "Albania",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Bahamas",
  "Bahrain",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Bhutan",
  "Bolivia",
  "Botswana",
  "Brazil",
  "Bulgaria",
  "Cambodia",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Czech Republic",
  "Denmark",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Fiji",
  "Finland",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kyrgyzstan",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Maldives",
  "Mexico",
  "Mongolia",
  "Morocco",
  "Myanmar",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Russia",
  "Samoa",
  "Saudi Arabia",
  "Serbia",
  "Seychelles",
  "Singapore",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "UAE",
  "Ukraine",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vietnam",
];

const Extracurriculars = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState<{
    outdoor_adventures: string | null;
    relaxing_and_wellness: string | null;
    fine_cuisine: string | null;
    tourist_sites: string | null;
  } | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch country data from Supabase
  useEffect(() => {
    const fetchCountryData = async () => {
      if (!selectedCountry) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("countries")
        .select("outdoor_adventures, relaxing_and_wellness, fine_cuisine, tourist_sites")
        .eq("country_name", selectedCountry)
        .single();

      if (error) {
        console.error("Error fetching country data:", error);
        setCountryData(null);
      } else {
        setCountryData(data);
      }

      setLoading(false);
    };

    fetchCountryData();
  }, [selectedCountry]);

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
            backgroundColor: "#D8A7A7",
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

        <Container maxWidth="lg" sx={{ py: 3 }}>
  <Box
    sx={{
      backgroundColor: "#F4E1E1",
      p: 3,
      borderRadius: 2,
      textAlign: "center",
      mb: 3,
    }}
  >
    <Typography variant="h4" gutterBottom>
      Explore Extracurriculars by Country
    </Typography>

    {/* Search and Select Country */}
    <TextField
      fullWidth
      placeholder="Search for a country"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ mb: 2 }}
    />
    <Select
      fullWidth
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value)}
      displayEmpty
      sx={{ mb: 3 }}
    >
      <MenuItem value="" disabled>
        Select a country
      </MenuItem>
      {filteredCountries.map((country, index) => (
        <MenuItem key={index} value={country}>
          {country}
        </MenuItem>
      ))}
    </Select>

    {/* Display the image when no country is selected */}
    {!selectedCountry && (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <img
          src="./images/ExtraCurricular.jpg"
          alt="Extracurriculars"
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>
    )}
  </Box>

  {loading ? (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <CircularProgress />
    </Box>
  ) : (
    countryData && (
      <>
        {[
          { title: "Outdoor Adventures", content: countryData.outdoor_adventures },
          { title: "Relaxing & Wellness", content: countryData.relaxing_and_wellness },
          { title: "Fine Cuisine", content: countryData.fine_cuisine },
          { title: "Tourist Sites", content: countryData.tourist_sites },
        ].map(
          (section, index) =>
            section.content && (
              <Paper
                key={index}
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: "#FDF7E3",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {section.content}
                </Typography>
              </Paper>
            )
        )}
      </>
    )
  )}
</Container>
      </Box>
    </Box>
  );
};

export default Extracurriculars;