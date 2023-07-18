let route = {
    route_service: null,
    route_default: '/api',
    Admin: {
        route_admin: '/admin',
        feature: {
            visit: {
                index: '/visitation',
                visitation: '/visitation/:ptnr_id/sales',
                visitation_schedule: '/visitation/:visit_code/schedule',
                visitation_detail: '/visitation/:visited_oid/detail'
            },
            SalesQuotation: {
                index: '/sales-quotation',
                invitation: '/sales-quotation/:ptnr_id/invitation',
                invitation_schedule: '/sales-quotation/:visit_code/invitation-schedule'
            },
        }
    }
}

module.exports = route