import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from './index.module.css'

class Profile extends Component {
    render() {
        if (!this.props.username) {
            console.log('чет пусто');
            return <Redirect push to="/" />;
        }

        let pointInfo, myPoints;
        if (this.props.points.length === 0) {
            pointInfo =
                <div>
                    У вас пока нет добавленных точек
                </div>
        } else {
            myPoints = this.props.points.map((point, index) =>
                <div
                    className={ classes.Point }
                    key={ index }
                >
                    { point.stringify() }
                </div>
            );
        }

        return(
            <div className={ classes.Profile }>
                <div className={ classes.Username }>
                    { this.props.username }
                </div>
                { pointInfo }
                { myPoints }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        points: state.auth.points
    }
};

export default connect(mapStateToProps)(Profile);