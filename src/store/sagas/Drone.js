import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
// import {delay} from "redux-saga"
import API from "../api";
import * as actions from "../actions";
function delay(duration) {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve(true), duration)
    })
    return promise
  }

function* watchFetchDrone() {
    while (true) {      
        const { data ,error } = yield call(
            API.getDroneInfo
        );      
        if (error) {
            yield put({ type: actions.API_ERROR, code: error.code });
            yield cancel();
            return;
        }
        
        // const latitude = data[374] ? data[374].latitude : false;
        // const longitude = data[374] ? data[374].longitude : false;
        // if (!latitude || !longitude) {
        //     yield put({ type: actions.API_ERROR });
        //     yield cancel();
        //     return;
        // }
        // const { error2, data2 } = yield call(
        //     API.findLocationByLatLng,
        //     latitude,
        //     longitude
        // );
        // if (error2) {
        //     yield put({ type: actions.API_ERROR, code: error.code });
        //     yield cancel();
        //     return;
        // }
        // const location = data2[0] ? data2[0].woeid : false;
        // if (!location) {
        //     yield put({ type: actions.API_ERROR });
        //     yield cancel();
        //     return;
        // }
        // console.log(location)
        // yield put({ type: actions.WEATHER_ID_RECEIVED, id: location });
        yield put({type: actions.DRONE_DATA_RECEIVED, data});
        
        yield put({type: actions.FETCH_MULTI_WEATHER, data})
        yield call(delay, 3000);  
    }
}
function* fetchMultiWeather(action) {
    const { data } = action;
    console.log(action)
    let arr = [];
    if (data) {
        // for (let i in data.data) {
        //     console.log(i)
        //     let c = yield call(API.findLocationByLatLng, data.data[i]);
        //   }
        arr = yield data.data.map(d => 
            call(API.findLocationByLatLng, d.latitude, d.longitude)   
        )
        
    }
    console.log(arr)
    let arrCopy = [];
    for (let i of arr) {
        console.log(i.data)
        arrCopy.push(i.data[0])
    }
    console.log(arrCopy)
    yield put({type: actions.WEATHER_MULTI_ID_RECEIVED, arr});
}
function* fetchMultiWeatherId(action) {
    const { arr } = action;
    // console.log(arr) 
    let arr2 = []
    if (arr) {
        // arr2 = yield arr.map(a => call(API.findWeatherbyId, a.woeid))
    }
    console.log(arr2)
    // let arr = [];
    // if (data) {
    //     arr = yield data.data.map(d => call(API.findLocationByLatLng,
    //         d.latitude,
    //         d.longitude))
    // }
    // console.log(arr)
    
}


function* watchAppLoad() {
    yield all([
        takeEvery(actions.FETCH_DRONE, watchFetchDrone),
        takeEvery(actions.FETCH_MULTI_WEATHER, fetchMultiWeather),
        takeEvery(actions.WEATHER_MULTI_ID_RECEIVED, fetchMultiWeatherId)
    ]);
}

export default [watchAppLoad];