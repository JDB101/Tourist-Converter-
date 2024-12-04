import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Container,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import { SelectChangeEvent } from "@mui/material";

interface ConversionCategory {
  name: string;
  units: string[];
  convert: (value: number, from: string, to: string) => number;
}

const conversionCategories: ConversionCategory[] = [
  {
    name: "Currency",
    units: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "MXN", "BRL", "RUB", "ZAR", "SGD", "NZD"],
    convert: (value, from, to) => {
      const usdRates = {
        USD: 1,
        EUR: 0.84,
        GBP: 0.72,
        JPY: 109.65,
        AUD: 1.29,
        CAD: 1.25,
        CHF: 0.92,
        CNY: 6.47,
        INR: 74.38,
        MXN: 20.06,
        BRL: 5.24,
        RUB: 74.16,
        ZAR: 14.73,
        SGD: 1.35,
        NZD: 1.4,
      };
      const usdValue = value / usdRates[from as keyof typeof usdRates];
      return usdValue * usdRates[to as keyof typeof usdRates];
    },
  },
  {
    name: "Weight",
    units: ["kg", "g", "lb", "oz", "stone", "tonne"],
    convert: (value, from, to) => {
      const kgValue = {
        kg: value,
        g: value / 1000,
        lb: value * 0.45359237,
        oz: value * 0.02834952,
        stone: value * 6.35029318,
        tonne: value * 1000,
      }[from] ?? 0;
      return ({
        kg: kgValue,
        g: kgValue * 1000,
        lb: kgValue / 0.45359237,
        oz: kgValue / 0.02834952,
        stone: kgValue / 6.35029318,
        tonne: kgValue / 1000,
      }[to] ?? 0);
    },
  },
  {
    name: "Length",
    units: ["m", "cm", "mm", "km", "mi", "yd", "ft", "in"],
    convert: (value, from, to) => {
      const meters = {
        m: value,
        cm: value / 100,
        mm: value / 1000,
        km: value * 1000,
        mi: value * 1609.34,
        yd: value * 0.9144,
        ft: value * 0.3048,
        in: value * 0.0254,
      }[from] ?? 0;
      return ({
        m: meters,
        cm: meters * 100,
        mm: meters * 1000,
        km: meters / 1000,
        mi: meters / 1609.34,
        yd: meters / 0.9144,
        ft: meters / 0.3048,
        in: meters / 0.0254,
      }[to] ?? 0);
    },
  },
  {
    name: "Temperature",
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    convert: (value, from, to) => {
      let celsiusValue;
      if (from === "Celsius") celsiusValue = value;
      else if (from === "Fahrenheit") celsiusValue = (value - 32) * (5 / 9);
      else celsiusValue = value - 273.15;

      if (to === "Celsius") return celsiusValue;
      else if (to === "Fahrenheit") return celsiusValue * (9 / 5) + 32;
      else return celsiusValue + 273.15;
    },
  },
  {
    name: "Time",
    units: ["seconds", "minutes", "hours", "days"],
    convert: (value, from, to) => {
      const seconds = {
        seconds: value,
        minutes: value * 60,
        hours: value * 3600,
        days: value * 86400,
      }[from] ?? 0;
      return ({
        seconds: seconds,
        minutes: seconds / 60,
        hours: seconds / 3600,
        days: seconds / 86400,
      }[to] ?? 0);
    },
  },
];


const Conversion = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [category, setCategory] = useState(conversionCategories[0].name);
  const [fromUnit, setFromUnit] = useState(conversionCategories[0].units[0]);
  const [toUnit, setToUnit] = useState(conversionCategories[0].units[1]);
  const [fromValue, setFromValue] = useState<string>("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const currentCategory = useMemo(
    () => conversionCategories.find((c) => c.name === category),
    [category]
  );

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    const newUnits = conversionCategories.find((c) => c.name === newCategory)?.units || [];
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1]);
  };

  const toValue = useMemo(() => {
    if (!currentCategory || !fromValue) return "";
    const numericValue = parseFloat(fromValue);
    if (isNaN(numericValue)) return "";
    const result = currentCategory.convert(numericValue, fromUnit, toUnit);
    return result.toFixed(4);
  }, [currentCategory, fromValue, fromUnit, toUnit]);

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
                onClick={() => onNavigate(item.page)} // Call onNavigate to navigate to the selected page
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

        {/* Conversion Functionality */}
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Conversion Tool
            </Typography>
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select fullWidth value={category} onChange={handleCategoryChange}>
                    {conversionCategories.map((cat) => (
                      <MenuItem key={cat.name} value={cat.name}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="From"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                  >
                    {currentCategory?.units.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="To"
                    value={toValue}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                  >
                    {currentCategory?.units.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>

        {/* Conversions Image */}
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
          <img
            src="./images/Conversions.jpg"
            alt="Conversions"
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

export default Conversion;
