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
                visitation_detail: '/visitation/:visited_oid/detail',
                visitation_create_periode: '/visitation/periode',
                visitation_sales: '/visitation/sales',
                visitation_checkin: '/visitation/:user_ptnr_id/checkin',
                visitation_sales_quotation: '/visitation/:user_ptnr_id/sales-quotation',
                visitation_output: '/visitation/:user_ptnr_id/output'
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