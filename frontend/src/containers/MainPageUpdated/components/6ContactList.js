/* eslint jsx-a11y/anchor-is-valid : 0 */
/* eslint jsx-a11y/img-redundant-alt : 0 */
import React, { Component } from 'react';

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.message.value);
        let link = `mailto:openfias@mail.ru?
            subject=Feedback from Open-FIAS
            &body=
            Sender-email: ${ event.target.email.value }%0A
            Sender-name: ${ event.target.name.value }%0A
            Message: %0A %0A ${ event.target.message.value }`
        window.location.href = link;
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h3><b>Свяжитесь с нами</b></h3>
                        <p className="text-muted pt-4">Мы всегда рады вашим замечаниям и предложениям по улучшению сайта. <br /> Мы ответим вам в течение недели.</p>
                    </div>
                </div>
                <div className="row mt-1 pt-5 justify-content-center">
                    <div className="col-md-8 col-sm-12">
                        <div className="bg-white p-4 contact-shadow">
                            <form className="p-5 form-custom" onSubmit={ this.handleSubmit } action="" method="post" encType="text/plain">
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name" placeholder="Ваше имя" required />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="email" name="email" placeholder="Ваш email" required />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="message" placeholder="Ваше сообщение" rows="6"></textarea>
                                </div>
                                <div className="form-group text-center mb-0">
                                    <input className="btn btn-custom btn-lg btn-rounded" type="submit"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactList;
