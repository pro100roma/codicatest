import AppBar from '@mui/material/AppBar';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <AppBar position="relative">
          <Toolbar>
              <Link to="/" style={{ color: 'white', display: 'flex' }}>
                <WbSunnyIcon sx={{ mr: 2 }} />
              </Link>
          </Toolbar>
        </AppBar>
    )
}
export default Header