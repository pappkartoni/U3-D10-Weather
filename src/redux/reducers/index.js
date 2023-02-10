const initialState = {
    recents: []
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_RECENT":
            if (!state.recents.find(r => r.loc === action.payload.loc)) {
                return {...state,
                    recents: [...state.recents, action.payload]}
            } else {
                return state
            }

        case "REMOVE_RECENT":
            return {...state,
                recents: state.recents.filter((el) => el.name !== action.payload.name)}

        default:
            return state
    }
}

export default mainReducer