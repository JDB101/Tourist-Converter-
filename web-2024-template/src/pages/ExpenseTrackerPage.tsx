// src/pages/ExpenseTrackerPage.tsx
import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

interface Expense {
  amount: number;
  description: string;
}

const ExpenseTrackerPage = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = () => {
    if (amount && description) {
      setExpenses([...expenses, { amount: parseFloat(amount), description }]);
      setAmount('');
      setDescription('');
    }
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Container maxWidth="sm">
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
  );
};

export default ExpenseTrackerPage;
