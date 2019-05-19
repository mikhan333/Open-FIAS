import React from 'react';
import Statistics from "../../Statistics";

const StatisticList = (props) => (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8 text-center">
                <h3><b>Статистика</b></h3>
                <p className="text-muted pt-4">На этой страничке вы можете увидеть статистику, <br/>которую мы собрали к данному моменту.</p>
            </div>
        </div>
        <Statistics />
    </div>
)

export default StatisticList;
