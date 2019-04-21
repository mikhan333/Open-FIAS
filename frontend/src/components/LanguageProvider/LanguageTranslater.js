import React from 'react';

export const LanguageContext = React.createContext();
export const LanguageConsumer = LanguageContext.Consumer;

const TranslatableText = props => (
    <LanguageConsumer>
        { ({ language }) => props.dictionary[ language ] }
    </LanguageConsumer>
);

export default TranslatableText;
