import {Routes, Route} from "react-router-dom";
import Home from './views/Home'
import Details from './views/Details'
import Header from './views/components/Header'
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const theme = createTheme();
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/codicatest" element={<Home />} />
          <Route path="/details/:city" element={<Details />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App
