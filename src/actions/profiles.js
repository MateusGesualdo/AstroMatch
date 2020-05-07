import axios from 'axios'
import { updateCurrentPage } from './route'
import { profileList } from './profileList'

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mateus'

const setMatches = matches => ({
	type: "SET_MATCHES",
	payload: { matches }
})

const setNewProfile = profile => ({
	type: "SET_NEW_PROFILE",
	payload: { profile }
})

const setMatchProfile = id => ({
	type: 'SET_MATCH_PROFILE',
	payload: { id }
})

export const selectMatchProfile = (id) => (dispatch) => {
	dispatch(setMatchProfile(id))
	dispatch(updateCurrentPage("ProfileScreen"))
}

/**************************************  START OF INTEGRATED VERSION   ******************************************/

// export const getMatches = () => async (dispatch) => {
// 	try {
// 		const response = await axios.get(`${baseUrl}/matches`)
// 		dispatch(setMatches(response.data.matches))
// 	} catch (err) { console.log(err) }
// }

// export const clearSwipes = () => async (dispatch) => {
// 	await axios.put(`${baseUrl}/clear`)
// 	dispatch(getNewProfile())
// }

// export const getNewProfile = () => async (dispatch) => {
// 	const message = "Sem mais perfis. Limpar swipes e matches?"
// 	const response = await axios.get(`${baseUrl}/person`)
// 	if (response.data.profile) {
// 		dispatch(setNewProfile(response.data.profile))		
// 	} else {
// 		if (window.confirm(message)) {
// 			dispatch(clearSwipes())
// 		}
// 	}
// }

// export const chooseProfile = (id, choice) => async (dispatch) => {
// 	try {
// 		await axios.post(
// 			`${baseUrl}/choose-person`,
// 			{ "id": id, "choice": choice },
// 		)
// 	} catch (err) {
// 		console.log(err)
// 	}
// 	dispatch(getNewProfile())
// }

/**************************************  START OF OFFLINE VERSION   *****************************************/

let swipedProfiles = JSON.parse(
	window.localStorage.getItem("swipedProfiles")
) || []

let remainingProfiles = [...profileList];
remainingProfiles.splice(0,swipedProfiles.length)

let matches = JSON.parse(
	window.localStorage.getItem("matches")
) || []

const message = "Sem mais perfis. Limpar swipes e matches?"

export const getNewProfile = () => (dispatch) => {
	if (remainingProfiles.length) {
		dispatch(setNewProfile(remainingProfiles[0]))
	} else {
		if (window.confirm(message)) {
			dispatch(clearSwipes())
		} else {
			dispatch(setNewProfile(''))
		}
	}
}

export const chooseProfile = (id, choice) => (dispatch) => {
	if (choice && Math.random() > 0.5) {
		matches.push(remainingProfiles[0])
		window.localStorage.setItem(
			"matches",
			JSON.stringify(matches)
		)
	}

	swipedProfiles.push(remainingProfiles.shift())
	window.localStorage.setItem(
		"swipedProfiles",
		JSON.stringify(swipedProfiles)
	)

	dispatch(getNewProfile())
}

export const getMatches = () => (dispatch) => {
	dispatch(setMatches(matches))
}

export const clearSwipes = () => (dispatch) => {
	window.localStorage.setItem("matches", "[]")
	window.localStorage.setItem("swipedProfiles", "[]")

	remainingProfiles = [...profileList]
	matches = []
	swipedProfiles = []

	dispatch(getNewProfile())
}