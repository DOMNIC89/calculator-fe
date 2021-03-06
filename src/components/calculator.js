/* eslint-disable */
import React from 'react';
import CalculatorTitle from './calculatorTitle';
import OutputScreen from './outputScreen';
import Button from './button';
import {config} from '../Constants';
import {uniqueNamesGenerator, names} from 'unique-names-generator';
import Feed from './feedActivity';

class Calculator extends React.Component {
    
    constructor() {
        super();
        this.state = {
            question: '',
            answer: '',
            messages: [],
        }

        this.handleClick = this.handleClick.bind(this);
        this.fetchLastActivities = this.fetchLastActivities.bind(this);
    }

    fetchLastActivities() {
        const requestOptions = {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        };

        fetch(config.url.GET_CALCULATOR_ACTIVITY).then( async response => {
            if (!response.ok) {
                // show a toast to display the message
                const err = {};
                return Promise.reject(err);
            }
            const data = await response.json()
            console.log(data);
            this.setState({messages: data});
        })
        .catch(err => {
                console.log("there was some error", err)
        });
    }

    componentDidMount() {
        const configuration = {
            dictionaries: [names]
        };

        if (!localStorage.getItem("username")) {
            localStorage.setItem("username", uniqueNamesGenerator(configuration));
        }

        var mqtt = require('mqtt');
        var clientid = localStorage.getItem("username")
        var options = {
            protocol: 'mqtts',
            clientId: clientid,
            username: config.credentials.MQTT_USERNAME,
            password: config.credentials.MQTT_PASSWORD
        }
        this.client = mqtt.connect('mqtt://'+config.url.MQTT_HOST+":"+config.url.MQTT_PORT, options);
        this.client.on('error', function(error) {
            console.log(error);
        })
        this.client.subscribe("calculatorsezzle");
        this.client.on('message', function(topic, message) {
            this.setState(
                {
                    messages: JSON.parse(message.toString())
                });
        }.bind(this));
        this.fetchLastActivities();
    }

    componentWillUnmount() {
        console.log("Disconnecting the mqtt socket");
        this.client.end(true, this.client.options, function() {});
    }

    handleClick(event) {
        const value = event.target.value;
        switch (value) {
            case '=':
                //todo: call service api to log the action and also to take name of the user.
                if (this.state.question !== '') {
                    this.logActivity();
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

    logActivity = () => {
        console.log(new Date().toISOString())
        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(
                {
                    question: this.state.question, 
                    answer: '', 
                    timestamp: new Date().toISOString(),
                    user: localStorage.getItem('username')
                })
        };

        fetch(config.url.POST_CALCULATOR_ACTIVITY, requestOptions)
            .then(async response => {
                console.log(response);
                const data = await response.json();
                console.log(data)
                if (!response.ok) {
                    // show a toast to display the message
                    console.log(data);
                    return Promise.reject({});
                }
                this.setState({
                    answer: parseFloat(data.answer),
                    question: ''
                })
                console.log(data.answer);
            })
            .catch(err => {
                console.log("there was some error", err)
        });
    }

    render() {
        const areMessagesPresent = this.state.messages.length > 0;
        let feedUI;
        if (areMessagesPresent) {
            feedUI = <Feed feeds={this.state.messages} />
        } else {
            feedUI = <div className="mainFeed" />
        }
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
                {feedUI}
            </div>
        );
    }
}

export default Calculator