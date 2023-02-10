const initialState = {
    recents: []
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_RECENT":
            return {...state,
                recents: [...state.recents, action.payload]}

        case "REMOVE_RECENT":
            return {...state,
                recents: state.recents.filter((el) => el.name !== action.payload.name)}

        default:
            return state
    }
}

export default mainReducer