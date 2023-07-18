const controller = {
    Admin: {
        SalesQuotationController: require('./Admin/SalesQuotationController'),
        VisitController: require('./Admin/VisitController')
    },
    Client: {
        PKController: require('./Client/PKController'),
        PartnerController: require('./Client/PartnerController'),
        PlanController: require('./Client/PlansController'),
        PartnerAddressController: require('./Client/PartnerAddressController'),
        PartnerContactController: require('./Client/PartnerContactController'),
        VisitController: require('./Client/VisitController'),
        SalesQuotationController: require('./Client/SalesQuotationController')
    },
    AuthController: require('./AuthController'),
    MasterController: require('./MasterController'),
}

module.exports = controller