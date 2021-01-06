/**
 * @file Contains the undervalued box which canges color based on the value.
 * @author Ian Argyle
 */

import React from 'react';

export default class UndervalBox extends React.Component {
    bgColor = () => {
        // Normalize the undervalued price between 0 and 120 for the hsl color
        let underPercent = (this.props.undervalue/this.props.price > .15) ? .15 : (this.props.undervalue/this.props.price < -.15) ? 0 : this.props.undervalue/this.props.price;
        console.log(underPercent);
        let norm = 120*((underPercent+.15)/.3)
        console.log(norm)
        return {backgroundColor:"hsl(" + norm + ", 54%, 43%)"};
    }
    normVal = () => {
        let desc = " Under";
        let num = this.props.undervalue;
        if (num < 0) {
            desc = " Over";
            num = -1*num;
        }
        return (num) ? num.toLocaleString() + desc : "Error";
    }
    render() {
        return (
            <span style={this.bgColor()} className="underval">
                <strong>${this.normVal()}</strong>
            </span>
        );
    }
}
