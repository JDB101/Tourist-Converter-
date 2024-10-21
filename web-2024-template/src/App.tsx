import { useState, useMemo } from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  Container,
  Grid,
  SelectChangeEvent,
  Paper,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface ConversionCategory {
  name: string;
  units: string[];
  convert: (value: number, from: string, to: string) => number;
}

const conversionCategories: ConversionCategory[] = [
  {
    name: "Currency",
    units: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "MXN", "BRL", "RUB"],
    convert: (value, from, to) => {
      const usdRates = {
        USD: 1, EUR: 0.84, GBP: 0.72, JPY: 109.65, AUD: 1.29, CAD: 1.25,
        CHF: 0.92, CNY: 6.47, INR: 74.38, MXN: 20.06, BRL: 5.24, RUB: 74.16
      };
      const usdValue = value / usdRates[from as keyof typeof usdRates];
      return usdValue * usdRates[to as keyof typeof usdRates];
    },
  },
  {
    name: "Weight",
    units: ["kg", "g", "lb", "oz", "stone", "tonne", "長噸", "短噸", "斤"],
    convert: (value, from, to) => {
      const kgValue = {
        kg: value,
        g: value / 1000,
        lb: value * 0.45359237,
        oz: value * 0.02834952,
        stone: value * 6.35029318,
        tonne: value * 1000,
        "長噸": value * 1016.0469088,
        "短噸": value * 907.18474,
        "斤": value * 0.5,
      }[from] ?? 0;
      return ({
        kg: kgValue,
        g: kgValue * 1000,
        lb: kgValue / 0.45359237,
        oz: kgValue / 0.02834952,
        stone: kgValue / 6.35029318,
        tonne: kgValue / 1000,
        "長噸": kgValue / 1016.0469088,
        "短噸": kgValue / 907.18474,
        "斤": kgValue / 0.5,
      }[to] ?? 0);
    },
  },
  {
    name: "Temperature",
    units: ["°C", "°F", "K", "°R", "°De", "°N", "°Ré"],
    convert: (value: number, from: string, to: string) => {
      const conversions: Record<string, Record<string, (v: number) => number>> = {
        "°C": {
          "°F": (v: number) => (v * 9) / 5 + 32,
          K: (v: number) => v + 273.15,
          "°R": (v: number) => (v + 273.15) * 9/5,
          "°De": (v: number) => (100 - v) * 3/2,
          "°N": (v: number) => v * 33/100,
          "°Ré": (v: number) => v * 4/5,
        },
        "°F": {
          "°C": (v: number) => (v - 32) * 5/9,
          K: (v: number) => (v + 459.67) * 5/9,
          "°R": (v: number) => v + 459.67,
          "°De": (v: number) => (212 - v) * 5/6,
          "°N": (v: number) => (v - 32) * 11/60,
          "°Ré": (v: number) => (v - 32) * 4/9,
        },
        // Add other conversions as needed
      };
  
      if (from === to) return value;
      return conversions[from]?.[to]?.(value) ?? value;
    },
  },
  {
    name: "Distance",
    units: ["km", "m", "mi", "yd", "ft", "in", "nmi", "li", "里", "寸"],
    convert: (value: number, from: string, to: string) => {
      const mValue = {
        km: value * 1000,
        m: value,
        mi: value * 1609.344,
        yd: value * 0.9144,
        ft: value * 0.3048,
        in: value * 0.0254,
        nmi: value * 1852,
        li: value * 500,
        "里": value * 500,
        "寸": value * 0.0333,
      }[from] ?? 0;
      return ({
        km: mValue / 1000,
        m: mValue,
        mi: mValue / 1609.344,
        yd: mValue / 0.9144,
        ft: mValue / 0.3048,
        in: mValue / 0.0254,
        nmi: mValue / 1852,
        li: mValue / 500,
        "里": mValue / 500,
        "寸": mValue / 0.0333,
      }[to] ?? 0);
    },
  },
  {
    name: "Speed",
    units: ["km/h", "m/s", "mph", "knot", "ft/s", "mach"],
    convert: (value, from, to) => {
      const msValue = {
        "km/h": value / 3.6,
        "m/s": value,
        mph: value * 0.44704,
        knot: value * 0.514444,
        "ft/s": value * 0.3048,
        mach: value * 340.3,
      }[from] ?? 0;
      return ({
        "km/h": msValue * 3.6,
        "m/s": msValue,
        mph: msValue / 0.44704,
        knot: msValue / 0.514444,
        "ft/s": msValue / 0.3048,
        mach: msValue / 340.3,
      }[to] ?? 0);
    },
  },
  {
    name: "Volume",
    units: ["L", "mL", "gal (US)", "gal (UK)", "fl oz (US)", "fl oz (UK)", "cup (US)", "cup (UK)", "pint (US)", "pint (UK)"],
    convert: (value, from, to) => {
      const lValue = {
        L: value,
        mL: value / 1000,
        "gal (US)": value * 3.78541,
        "gal (UK)": value * 4.54609,
        "fl oz (US)": value * 0.0295735,
        "fl oz (UK)": value * 0.0284131,
        "cup (US)": value * 0.236588,
        "cup (UK)": value * 0.284131,
        "pint (US)": value * 0.473176,
        "pint (UK)": value * 0.568261,
      }[from] ?? 0;
      return ({
        L: lValue,
        mL: lValue * 1000,
        "gal (US)": lValue / 3.78541,
        "gal (UK)": lValue / 4.54609,
        "fl oz (US)": lValue / 0.0295735,
        "fl oz (UK)": lValue / 0.0284131,
        "cup (US)": lValue / 0.236588,
        "cup (UK)": lValue / 0.284131,
        "pint (US)": lValue / 0.473176,
        "pint (UK)": lValue / 0.568261,
      }[to] ?? 0);
    },
  },
];

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

const App = () => {
  const [category, setCategory] = useState(conversionCategories[0].name);
  const [fromUnit, setFromUnit] = useState(conversionCategories[0].units[0]);
  const [toUnit, setToUnit] = useState(conversionCategories[0].units[1]);
  const [fromValue, setFromValue] = useState<string>("");

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
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Tourist Converter
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  value={category}
                  onChange={handleCategoryChange}
                >
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
                  InputProps={{
                    readOnly: true,
                  }}
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
    </ThemeProvider>
  );
};

export default App;
