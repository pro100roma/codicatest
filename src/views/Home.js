import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCityWeather } from '../redux/actions/weather';
import {Link} from "react-router-dom";

//Material UI
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
    const dispatch = useDispatch();
    // const store = useSelector((state: any) => state.weather);
    // const [selectState, setPlaceSelect] = React.useState<string | null>(options[0]);
    const store = useSelector(state => state.weather);
    const [selectState, setPlaceSelect] = useState('')
    const [citiesState, setCities] = useState([])
    const [moreInfo, setMoreInfo] = useState(false)

    useEffect(() => {
        const cities = JSON.parse(localStorage.getItem('cities'));
        if (cities) {
            setCities(cities);
        }
    }, [store]) //second argument to conditionally re-render when value changes // if empty - will run every render

    const addCity = () => {
        dispatch(getCityWeather(selectState))
    }
    const cleanCities = () => {
        localStorage.clear();
        setCities([])
    }
    const updateCity = data => {
        console.log('update')
    }

    return (
        <main>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Typography variant="h6" color="inherit" noWrap sx={{ mr: 2 }}>
                    Add new city, please
                </Typography>
                <FormControl fullWidth>
                    <TextField 
                        label="City"
                        variant="outlined"
                        value={selectState}
                        onChange={e => {
                            setPlaceSelect(e.target.value);
                        }}
                    />
                </FormControl>
                <Button size="small" variant="contained" onClick={addCity} sx={{ m: 2 }}>Add</Button>
                <Button size="small" onClick={cleanCities} sx={{ m: 2 }}>Clean</Button>
                { store.status === 'fetching' ? (
                    <div>
                        <CircularProgress />
                    </div>
                ) : (
                <div>
                {store.error !== null ? (
                    <Alert severity="warning">City name is incorrect.</Alert>
                ) : null}
                <Grid container spacing={4}>
                    {citiesState ? citiesState.map((card, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4}>
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {card.name}
                            </Typography>
                            <Typography>
                            Temperature: {(card.main.temp - 273).toFixed(1)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={`/details/${card.name}`}><Button size="small" onClick={() => {setMoreInfo(!moreInfo)}}>More</Button></Link>
                            <Button size="small" onClick={updateCity}>Update</Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    )) : <div style={{textAlign: 'center', margin: '60px auto'}}>Nothing...</div>}
                </Grid>
                </div>
                )}
                </Container>
            </main>
        );
    }

export default Home