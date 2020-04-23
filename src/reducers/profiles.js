const initialState = {
  profileToSwipe: '',
  matches: [],
  selectedMatchProfile: {}
}

const profiles = (state = initialState, action) => {
  switch (action.type) {

    case "SET_PROFILE":
      return { ...state, profileToSwipe: action.payload.profile }

    case "SET_MATCHES":
      return { ...state, matches: action.payload.matches }

    case "SET_MATCH_PROFILE":

      const { id } = action.payload
      const selectedMatchProfile = state.matches.find(
        match => match.id === id
      )

      return { ...state, selectedMatchProfile }

    default:
      return state
  }
}

export default profiles
