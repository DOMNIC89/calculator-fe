const prod = {
    url: {
        API_URL: 'https://warm-shelf-20678.herokuapp.com',
        POST_CALCULATOR_ACTIVITY: 'https://warm-shelf-20678.herokuapp.com/api/v1/calculator-activity'
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:8080',
        POST_CALCULATOR_ACTIVITY: 'http://localhost:8080/api/v1/calculator-activity'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod