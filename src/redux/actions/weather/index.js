import axios from 'axios'
import themeConfig from '../../../configs/themeConfig'
const key = themeConfig.api.key
const url = themeConfig.api.url

// ** Get all Data
export const getCityWeather = (data) => {
  return async dispatch => {
    await dispatch({
        type: 'WEATHER_ERROR',
        error: null
    })
    await dispatch({
        type: 'WEATHER_STATUS',
        status: 'fetching'
    })
    await axios.get(`${url}weather?q=${data}&appid=${key}`).then(response => {
        const responseData = response.data
        
        const cities = JSON.parse(localStorage.getItem('cities'));
        if (cities) {
            cities.push(responseData)
            localStorage.setItem('cities', JSON.stringify(cities));
        } else {
            const newArr = []
            newArr.push(responseData)
            localStorage.setItem('cities', JSON.stringify(newArr));
        }
      dispatch({
        type: 'GET_CITY_INFO',
        data: responseData
      })
      setTimeout(() => {
        dispatch({
            type: 'WEATHER_STATUS',
            status: 'success'
          })
      }, 300)
    }).catch(err => {
        dispatch({
          type: 'WEATHER_STATUS',
          status: 'error'
        })
        dispatch({
          type: 'WEATHER_ERROR',
          error: err
        })
    })
  }
}

export const getCityDetails = (data) => {
    return async dispatch => {
      await dispatch({
          type: 'WEATHER_ERROR',
          error: null
      })
      await dispatch({
          type: 'WEATHER_STATUS',
          status: 'fetching'
      })
      await axios.get(`${url}weather?q=${data}&appid=${key}`).then(response => {
          console.log(response)
        dispatch({
          type: 'GET_CITY_INFO',
          data: response.data
        })
        setTimeout(() => {
          dispatch({
              type: 'WEATHER_STATUS',
              status: 'success'
            })
        }, 300)
      }).catch(err => {
          dispatch({
            type: 'WEATHER_STATUS',
            status: 'error'
          })
          dispatch({
            type: 'WEATHER_ERROR',
            error: err
          })
      })
    }
}