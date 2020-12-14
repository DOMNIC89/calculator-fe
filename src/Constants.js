const prod = {
    url: {
        API_URL: 'https://warm-shelf-20678.herokuapp.com',
        POST_CALCULATOR_ACTIVITY: 'https://warm-shelf-20678.herokuapp.com/api/v1/calculator-activity',
        GET_CALCULATOR_ACTIVITY: 'https://warm-shelf-20678.herokuapp.com/api/v1/calculator-activity',
        MQTT_HOST: 'driver.cloudmqtt.com',
        MQTT_PORT: '38986'
    },
    credentials: {
        MQTT_USERNAME: 'dwwoihtf',
        MQTT_PASSWORD: 'gqIZBlNorDJj'
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:8080',
        POST_CALCULATOR_ACTIVITY: 'http://localhost:8080/api/v1/calculator-activity',
        GET_CALCULATOR_ACTIVITY: 'http://localhost:8080/api/v1/calculator-activity',
        MQTT_HOST: 'driver.cloudmqtt.com',
        MQTT_PORT: '38986'
    },
    credentials: {
        MQTT_USERNAME: 'dwwoihtf',
        MQTT_PASSWORD: 'gqIZBlNorDJj'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod