import React, { Component } from 'react';

export default class HelloWorld extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-12 text-center">
                    <h1>{this.props.message}</h1>
                </div>
            </div>
        );
    }

}

