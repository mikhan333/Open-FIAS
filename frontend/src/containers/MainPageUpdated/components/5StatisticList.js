import React from 'react';
import Statistics from "../../Statistics";
import TranslatableText from "../../../components/LanguageProvider/LanguageTranslater";

const StatisticList = (props) => (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8 text-center">
                <h3><b>
                    <TranslatableText
                        dictionary={{
                            russian: "Статистика",
                            english: "Statistics"
                        }}
                    />
                </b></h3>
                <p className="text-muted pt-4">
                    <TranslatableText
                        dictionary={{
                            russian: "На этой страничке вы можете увидеть статистику, которую мы собрали к данному моменту.",
                            english: "On this page you can see the statistics that we have collected to this point."
                        }}
                    />
                </p>
            </div>
        </div>
        <Statistics />
    </div>
);

export default StatisticList;
