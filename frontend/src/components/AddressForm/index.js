import React, { Component } from 'react'
import { InputGroup, FormControl } from "react-bootstrap";

import classes from './index.module.css'

class AddressForm extends Component {
    constructor(props) {
        super(props);

        const fields = [
            'Название',
            'Почтовый индекс',
            'Регион',
            'Город',
            'Улица',
            'Дом'
        ];

        this.state = {
            fields,

        };
    }

    render() {
        const form = this.state.fields.map((field, index) => (
            <InputGroup className={ classes.Input } key={ index }>
                <InputGroup.Prepend>
                    <label htmlFor={ index }>
                        <InputGroup.Text>
                            { field }
                        </InputGroup.Text>
                    </label>
                </InputGroup.Prepend>
                <FormControl id={ index }/>
            </InputGroup>
        ));

        return (
            <div>
                { form }
            </div>
        )
    }
}

export default AddressForm;