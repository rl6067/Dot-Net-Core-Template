import ReactDOM from 'react-dom';
import React, { Component } from 'react';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '', uploadResponse: null }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleSubmit() {
        let dataToPost = {
            message: this.state.message
        };

        fetch('/', {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify(dataToPost),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => this.setState({ uploadResponse: data }));

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="container">
                <h1>Message</h1>
                <input id="message" name="message" onChange={this.handleChange}/>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                {this.state.uploadResponse != null ? <h1>{this.state.uploadResponse.response}</h1> : null }
            </div>
        );
    }
}

const rootElement = document.getElementById('root');

ReactDOM.render(<Home />, rootElement);

