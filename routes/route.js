let route = {
    route_service: null,
    route_default: '/api',
    Admin: {
        route_admin: '/admin',
        SalesQuotation: {
            index: '/sales-quotation',
            invitation: '/sales-quotation/:ptnr_id/invitation',
            invitation_schedule: '/sales-quotation/:visit_code/invitation-schedule'
        },
        feature: {
            visit: {
                index: '/visitation',
                invitation: '/invitation/:ptnr_id/sales',
                invitation_schedule: '/invitation/:visit_code/schedule'
            }
        }
    }
}

module.exports = route