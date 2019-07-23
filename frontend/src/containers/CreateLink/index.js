import React from 'react'
import SideMap from '../../components/Mapbox'
import SuggestBar from '../../components/SuggestBar'
import UserInfo from '../../components/Header/UserInfo'

import classes from './index.module.css'

const CreateLink = () => (
    <div className={ classes.CreateLinkContainer }>
        <div className={ classes.SuggestBar }><SuggestBar/></div>
        <div className={ classes.Map }><SideMap/></div>
        <div className={ classes.UserInfo }><UserInfo withoutUsername={ true }/></div>
    </div>
);

export default CreateLink