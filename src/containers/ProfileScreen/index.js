import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { updateCurrentPage } from '../../actions/route'
import AppBar from '../../components/AppBar'
import { MatchIcon } from '../SwipeScreen/styled'
import { mdiAccountMultipleCheck } from '@mdi/js'
import { Img, H2, ProfileWrapper } from './styled'

function ProfileScreen(props) {
  return (
    <div>

      <AppBar rightAction={<MatchIcon
        size={1.5}
        path={mdiAccountMultipleCheck}
        onClick={props.goToMatchScreen}
      />} />

      <ProfileWrapper>
        <Img src={props.profile.photo} />
        <H2>{props.profile.name}, {props.profile.age}</H2>
        <p>{props.profile.bio}</p>
      </ProfileWrapper>

    </div>
  )
}

ProfileScreen.propTypes = {
  goToMatchScreen: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profiles.selectedMatchProfile
})

const mapDispatchToProps = (dispatch) => ({
  goToMatchScreen: () => dispatch(updateCurrentPage('MatchScreen'))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
