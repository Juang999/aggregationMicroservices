const kernel = {
    authenticate: require('./Middleware/authenticate'),
    CheckinRequest: require('./Middleware/Requests/CheckinRequest'),
    CheckoutRequest: require('./Middleware/Requests/CheckoutRequest'),
    CreateScheduleToVisit: require('./Middleware/Requests/CreateScheduleRequest'),
    CreatePeopleToVisit: require('./Middleware/Requests/CreatePeopleToVisitRequest'),
    AuthRequest: require('./Middleware/Requests/AuthRequest')
}

module.exports = kernel