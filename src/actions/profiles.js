import axios from 'axios'

export const clearSwipes = () => async (dispatch) => {
	await axios.put('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mateus/clear')
}

export const getProfile = () => async (dispatch) => {
	const response = await axios.get('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mateus/person')	
	dispatch(setProfile(response.data.profile))
}

const setProfile = profile => ({
	type: "SET_PROFILE",
	payload: { profile }
})

export const chooseProfile = (id, choice) => async(dispatch) => {
	const headers = { "Content-Type": "application/json" }
	try {
		const response = await axios.post(
			"https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mateus/choose-person",
			{ "id": id , "choice": choice },
		)		
	} catch (err){
		console.log(err)
	}	 	
	dispatch(getProfile())
}

export const getMatches = () => async (dispatch) => {
	try {
		const response = await axios.get('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mateus/matches')	
		dispatch(setMatches(response.data.matches))
		console.log(response.data.matches)		
	} catch (err) { console.log(err) }
}

const setMatches = matches => ({
	type: "SET_MATCHES",
	payload: { matches }
})