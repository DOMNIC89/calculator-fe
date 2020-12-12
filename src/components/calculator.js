import React from 'react';
import CalculatorTitle from './calculatorTitle';
import OutputScreen from './outputScreen';
import Button from './button';
import {config} from '../Constants';
import {uniqueNamesGenerator, names} from 'unique-names-generator';

class Calculator extends React.Component {
    
    constructor() {
        super();
        this.state = {
            question: '',
            answer: ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const configuration = {
            dictionaries: [names]
        };
        if (!localStorage.getItem("username")) {
            localStorage.setItem("username", uniqueNamesGenerator(configuration));
        }
    }

    handleClick(event) {
        const value = event.target.value;
        switch (value) {
            case '=':
                //todo: call service api to log the action and also to take name of the user.
                var ans = ''
                if (this.state.question !== '') {
                    try {
                        ans = eval(this.state.question)
                    } catch(err) {
                        this.setState({answer: "Math error"})
                    }
                    if (ans === undefined) {
                        this.setState({answer: "Math error"})
                    } else {
                        this.setState({answer: ans, question: ''})
                    }
                    // call server to log this activity
                    this.logActivity(ans);
                }
                break;
            case 'Clear':
                this.setState({answer: '', question: ''})
                break;
            case 'Delete':
                var str = this.state.question;
                str = str.substr(0, str.length - 1);
                this.setState({question: str});
                break;
            default:
                this.setState({ question: this.state.question += value})
                break;
        }
    }

    logActivity = (ans) => {
        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(
                {
                    question: this.state.question, 
                    answer: ans, 
                    timestamp: new Date().toLocaleString(),
                    user: localStorage.getItem('username')
                })
        };

        fetch(config.url.POST_CALCULATOR_ACTIVITY, requestOptions)
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    // show a toast to display the message
                    const err = {};
                    console.log(data);
                    return Promise.reject(err);
                }
            })
            .catch(err => {
                console.log("there was some error", err)
        });
    }

    render() {
        return (
            <div className="frame">
                <CalculatorTitle value="Sezzle Calculator" />
                <div className="mainCalc">
                    <OutputScreen question={this.state.question} answer={this.state.answer} />
                    <div className="button-row">
                        <Button label={'Clear'} handleClick={this.handleClick}/> 
                        <Button label={'Delete'} handleClick={this.handleClick}/> 
                        <Button label={'.'} handleClick={this.handleClick}/> 
                        <Button label={'/'} handleClick={this.handleClick}/> 
                    </div>
                    <div className="button-row"> 
                        <Button label={'7'} handleClick={this.handleClick}/> 
                        <Button label={'8'} handleClick={this.handleClick}/> 
                        <Button label={'9'} handleClick={this.handleClick}/> 
                        <Button label={'*'} handleClick={this.handleClick}/> 
                    </div>
                    <div className="button-row"> 
                        <Button label={'4'} handleClick={this.handleClick}/> 
                        <Button label={'5'} handleClick={this.handleClick}/> 
                        <Button label={'6'} handleClick={this.handleClick}/> 
                        <Button label={'-'} handleClick={this.handleClick}/> 
                    </div> 
                    <div className="button-row"> 
                        <Button label={'1'} handleClick={this.handleClick}/> 
                        <Button label={'2'} handleClick={this.handleClick}/> 
                        <Button label={'3'} handleClick={this.handleClick}/> 
                        <Button label={'+'} handleClick={this.handleClick}/> 
                    </div>
                    <div className="button-row"> 
                        <Button label={'0'} handleClick={this.handleClick}/> 
                        <Button label={'='} handleClick={this.handleClick}/> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;