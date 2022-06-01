import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getCityDetails } from '../redux/actions/weather';

//** Material UI
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Details = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state.weather);
    const { city } = useParams();
    useEffect(() => {
        dispatch(getCityDetails(city))
    }, []) 
    if (store.status === 'fetching') {
        return (
            <CircularProgress />
        )
    } else if (store.status === 'success' && store.selectedCity !== null && store.selectedCity !== undefined) {
        const cityData = store.selectedCity
        return (
            <div>
                <Typography variant="h2" noWrap sx={{ my: 2 }}>
                    Weather in {cityData.name}
                </Typography>
                <Typography sx={{ my: 1 }}>Coordinates: {cityData.coord ? `${cityData.coord.lat}, ${cityData.coord.lon}` : null}</Typography>
                {cityData.main ? (
                    <div>
                        <Typography sx={{ my: 1 }}>Humidity: {cityData.main.humidity}</Typography>
                        <Typography sx={{ my: 1 }}>Pressure: {cityData.main.pressure}</Typography>
                        <Typography sx={{ my: 1 }}>Temperature: {Math.round(cityData.main.temp - 273)}</Typography>
                        <Typography sx={{ my: 1 }}>Feels like: {Math.round(cityData.main.feels_like - 273)}</Typography>
                    </div>
                ) : null}
                {cityData.sys ? (
                    <div>
                        <Typography variant="h6" sx={{ my: 1 }}>Country: {cityData.sys.country}</Typography>
                    </div>
                ) : null}
                {cityData.weather ? (
                    <div>
                        <Typography sx={{ my: 1 }}>Weather: {cityData.weather[0].main}</Typography>
                        <Typography sx={{ my: 1 }}>Description: {cityData.weather[0].description}</Typography>
                    </div>
                ) : null}
            </div>
        )
    } else {
        return (
            <div>
              <Alert severity="warning">Something went wrong...</Alert>
            </div>
        )
    }
}
export default Details