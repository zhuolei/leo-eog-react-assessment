import * as actions from "../actions";

const initialState = {
    loading: true,
    list:[]
};

const startLoading = (state, action) => {
    return {...state, loading: true};
}

const DroneDataRecieved = (state, action) => {
    const { data } = action;
    if (!data["data"]) return state;
    const len = data["data"].length
    // console.log([...data["data"]]);
    return {
        ...state,
        loading: false,
        list: [...data["data"]]
    }
}

const handlers = {
    [actions.FETCH_DRONE]: startLoading,
    [actions.DRONE_DATA_RECEIVED]: DroneDataRecieved
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
}