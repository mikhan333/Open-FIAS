/* eslint jsx-a11y/anchor-is-valid : 0 */
/* eslint jsx-a11y/img-redundant-alt : 0 */
import React, { Component } from 'react';
import { connect } from "react-redux";
import TranslatableText from "../../../components/LanguageProvider/LanguageTranslater";

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholders: {
                name: {
                    russian: 'Ваше имя',
                    english: 'Your name'
                },
                email: {
                    russian: 'Ваша почта',
                    english: 'Your email'
                },
                message: {
                    russian: 'Ваше сообщение',
                    english: 'Your message'
                }
            },
            button: {
                russian: 'Отправить',
                english: 'Send'
            }
        };

        ContactList.handleSubmit = ContactList.handleSubmit.bind(this);
    }

    static handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.message.value);
        let link = `mailto:openfias@mail.ru?
            subject=Feedback from Open-FIAS
            &body=
            Sender-email: ${ event.target.email.value }%0A
            Sender-name: ${ event.target.name.value }%0A
            Message: %0A %0A ${ event.target.message.value }`;
        window.location.href = link;
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h3><b>
                            <TranslatableText
                                dictionary={{
                                    russian: "Свяжитесь с нами",
                                    english: "Contact us"
                                }}
                            />
                        </b></h3>
                        <p className="text-muted pt-4">
                            <TranslatableText
                                dictionary={{
                                    russian: "Мы всегда рады вашим замечаниям и предложениям по улучшению сайта.",
                                    english: "We always welcome your comments and suggestions for improving the site."
                                }}
                            /><br />
                            <TranslatableText
                                dictionary={{
                                    russian: "Мы ответим вам в течение недели.",
                                    english: "We will reply to you within a week."
                                }}
                            />
                        </p>
                    </div>
                </div>
                <div className="row mt-1 pt-5 justify-content-center">
                    <div className="col-md-8 col-sm-12">
                        <div className="bg-white p-4 contact-shadow">
                            <form className="p-5 form-custom" onSubmit={ ContactList.handleSubmit } action="" method="post" encType="text/plain">
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name" placeholder={ this.state.placeholders.name[this.props.language] } required />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="email" name="email" placeholder={ this.state.placeholders.email[this.props.language] } required />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="message" placeholder={ this.state.placeholders.message[this.props.language] } rows="6"></textarea>
                                </div>
                                <div className="form-group text-center mb-0">
                                    <input className="btn btn-custom btn-lg btn-rounded" type="submit" value={ this.state.button[this.props.language] }/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.auth.language,
    }
};

export default connect(mapStateToProps)(ContactList);
