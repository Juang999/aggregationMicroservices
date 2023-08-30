class Controller {
    constructor () {
        return {
            Admin: {
                VisitController: require('./Admin/VisitController'),
                SalesQuotationController: require('./Admin/SalesQuotationController'),
            },
            Client: {
                PlanController: require('./Client/PlansController'),
                VisitController: require('./Client/VisitController'),
                ReportController: require('./Client/ReportController'),
                ProductController: require('./Client/ProductController'),
                PartnerController: require('./Client/PartnerController'),
                PartnerAddressController: require('./Client/PartnerAddressController'),
                PartnerContactController: require('./Client/PartnerContactController'),
                SalesQuotationController: require('./Client/SalesQuotationController')
            },
            AuthController: require('./AuthController'),
            MasterController: require('./MasterController'),
        }
    }
}

module.exports = new Controller()