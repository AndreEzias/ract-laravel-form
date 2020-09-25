import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";

export default class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Form />
                <Footer />
            </React.Fragment>
        );
    }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
