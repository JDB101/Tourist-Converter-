import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  List as NavList,
  ListItem as NavListItem,
  ListItemText as NavListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";

interface Expense {
  amount: number;
  description: string;
}

const ExpenseTrackerPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAddExpense = () => {
    if (amount && description) {
      setExpenses([...expenses, { amount: parseFloat(amount), description }]);
      setAmount("");
      setDescription("");
    }
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

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
          <NavList>
            {[
              { text: "Home", page: "home" },
              { text: "Conversion Tool", page: "conversion" },
              { text: "Translator", page: "translate" },
              { text: "Expense Tracker", page: "expense-tracker" },
              { text: "Extracurriculars", page: "extracurriculars" },
              { text: "Cultural Recs", page: "cultural-recs" },
            ].map((item, index) => (
              <NavListItem
                key={index}
                onClick={() => onNavigate(item.page)}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <StarIcon sx={{ color: "#F3B8B8", marginRight: 1 }} />
                <NavListItemText primary={item.text} />
              </NavListItem>
            ))}
          </NavList>
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

        {/* Expense Tracker Functionality */}
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Expense Tracker
            </Typography>

            {/* Input for Amount */}
            <TextField
              fullWidth
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            {/* Input for Description */}
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />

            {/* Add Expense Button */}
            <Button variant="contained" color="primary" onClick={handleAddExpense}>
              Add Expense
            </Button>

            {/* Expense List */}
            <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Expenses
              </Typography>
              <List>
                {expenses.map((expense, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`${expense.description}`}
                        secondary={`Amount: $${expense.amount.toFixed(2)}`}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>

              {/* Total Amount */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total Spent: ${total.toFixed(2)}
              </Typography>
            </Paper>
          </Box>
        </Container>

        {/* Expense Tracker Image */}
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
          <img
            src="./images/ExpenseTracker.jpg"
            alt="Expense Tracker"
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

export default ExpenseTrackerPage;
