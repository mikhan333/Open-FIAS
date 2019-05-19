/* eslint jsx-a11y/anchor-is-valid : 0 */
/* eslint jsx-a11y/img-redundant-alt : 0 */
import React from 'react';

const ContactList = (props) => (
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 text-center">
                <h3><b>Свяжитесь с нами</b></h3>
                <p class="text-muted pt-4">Мы всегда рады вашим замечаниям и предложениям по улучшению сайта. <br/> Мы ответим вам в течение недели.</p>
            </div>
        </div>
        <div class="row mt-1 pt-5 justify-content-center">
            <div class="col-md-8 col-sm-12">
                <div class="bg-white p-4 contact-shadow">
                    <form class="p-5 form-custom">
                        <div class="form-group">
                            <input class="form-control" type="text" name="name" placeholder="Your Name" required />
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="email" name="email" placeholder="Your Email" required />
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" name="message" placeholder="Your Message" rows="6"></textarea>
                        </div>
                        <div class="form-group text-center mb-0">
                            <input class="btn btn-custom btn-lg btn-rounded" type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
)

export default ContactList;
