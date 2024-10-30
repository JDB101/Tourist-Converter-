// App.tsx
import { Routes, Route, Link } from "react-router-dom";
import { Typography, Box, Container, Paper, Button } from "@mui/material";
import HomePage from "./pages/HomePage";
import TranslatePage from "./pages/TranslatePage";
import ExpenseTrackerPage from "./pages/ExpenseTrackerPage";

const App = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Tourist Converter
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: "center" }}>
          <Button component={Link} to="/" variant="outlined" sx={{ m: 1 }}>
            Conversions
          </Button>
          <Button component={Link} to="/translate" variant="outlined" sx={{ m: 1 }}>
            Translate
          </Button>
          <Button component={Link} to="/expense-tracker" variant="outlined" sx={{ m: 1 }}>
            Expense Tracker
          </Button>
        </Paper>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/expense-tracker" element={<ExpenseTrackerPage />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
