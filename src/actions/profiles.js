import axios from 'axios'
import { updateCurrentPage } from './route'

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mateus'

const setMatches = matches => ({
	type: "SET_MATCHES",
	payload: { matches }
})

const setProfile = profile => ({
	type: "SET_PROFILE",
	payload: { profile }
})

const setMatchProfile = id => ({
	type: 'SET_MATCH_PROFILE',
	payload: { id }
})

export const getMatches = () => async (dispatch) => {
	try {
		const response = await axios.get(`${baseUrl}/matches`)
		dispatch(setMatches(response.data.matches))
	} catch (err) { console.log(err) }
}

export const clearSwipes = () => async (dispatch) => {
	await axios.put(`${baseUrl}/clear`)
	dispatch(getProfile())
}

export const getProfile = () => async (dispatch) => {
	const message = "Sem mais perfis. Limpar swipes e matches?"
	const response = await axios.get(`${baseUrl}/person`)
	if (response.data.profile) {
		dispatch(setProfile(response.data.profile))
	} else {
		if (window.confirm(message)) {
			dispatch(clearSwipes())
		}
	}
}

export const chooseProfile = (id, choice) => async (dispatch) => {
	try {
		await axios.post(
			`${baseUrl}/choose-person`,
			{ "id": id, "choice": choice },
		)
	} catch (err) {
		console.log(err)
	}
	dispatch(getProfile())
}

export const selectMatchProfile = (id) => (dispatch) => {
	dispatch(setMatchProfile(id))
	dispatch(updateCurrentPage("ProfileScreen"))
}



