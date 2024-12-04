import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";

const Home = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      <Box flexGrow={1} position="relative" height="100vh" overflow="hidden">
        {/* Header */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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

        {/* Full-Screen Background Image */}
        <Box
          component="img"
          src="./images/homepage.jpg"
          alt="Home"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />

        {/* Centered Content */}
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            color: "#FFF",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.8)",
            }}
          >
            Travel with Travis, Travel with Tracie, Travel Together
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
