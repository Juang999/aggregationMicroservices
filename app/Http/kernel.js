const kernel = {
    authenticate: require('./Middleware/authenticate'),
    CheckinRequest: require('./Middleware/Requests/CheckinRequest'),
    CheckoutRequest: require('./Middleware/Requests/CheckoutRequest')
}

module.exports = kernel