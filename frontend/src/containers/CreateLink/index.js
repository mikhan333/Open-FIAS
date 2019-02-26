import React from 'react'
import SideMap from '../../components/SideMap'
import SuggestBar from '../../components/SuggestBar'

import './index.css'

const CreateLink = () => (
    <div>
        <div className="addressBar"><SuggestBar/></div>
        <div className="Map"><SideMap/></div>
    </div>
);

export default CreateLink