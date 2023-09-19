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
                PartnerController: require('./Client/PartnerController'),
                ProductController: require('./Client/ProductController'),
                InventoryController: require('./Client/InventoryController'),
                PointofSalesController: require('./Client/PointofSalesController'),
                PartnerAddressController: require('./Client/PartnerAddressController'),
                PartnerContactController: require('./Client/PartnerContactController'),
                SalesQuotationController: require('./Client/SalesQuotationController'),
            },
            AuthController: require('./AuthController'),
            MasterController: require('./MasterController'),
        }
    }
}

module.exports = new Controller()