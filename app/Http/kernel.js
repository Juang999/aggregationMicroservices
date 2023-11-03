const kernel = {
    authenticate: require('./Middleware/authenticate'),
    CheckinRequest: require('./Middleware/Requests/CheckinRequest'),
    CheckoutRequest: require('./Middleware/Requests/CheckoutRequest'),
    CreateScheduleToVisit: require('./Middleware/Requests/CreateScheduleRequest'),
    CreatePeopleToVisit: require('./Middleware/Requests/CreatePeopleToVisitRequest'),
    AuthRequest: require('./Middleware/Requests/AuthRequest'),
    UnplanRequest: require('./Middleware/Requests/UnplanRequest'),
    CreatePartnerRequest: require('./Middleware/Requests/CreatePartnerRequest'),
    CreatePartnerAddressRequest: require('./Middleware/Requests/CreatePartnerAddressRequest'),
    CreatePartnerContactRequest: require('./Middleware/Requests/CreatePartnerContactRequest'),
    createSalesQuotationRequest: require('./Middleware/Requests/CreateSalesQuotationRequest')
}

module.exports = kernel