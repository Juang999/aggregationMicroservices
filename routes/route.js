let route = {
    route_service: null,
    route_default: '/api',
    logout: '/logout',
    Admin: {
        route_admin: '/admin',
        feature: {
            visit: {
                index_and_create: '/visitation',
                visitation: '/visitation/:ptnr_id/sales',
                visitation_schedule: '/visitation/:visit_code/schedule',
                visitation_detail: '/visitation/:visited_oid/detail',
                visitation_create_periode: '/visitation/periode',
                visitation_sales: '/visitation/sales',
                visitation_checkin: '/visitation/:user_ptnr_id/checkin',
                visitation_sales_quotation: '/visitation/:user_ptnr_id/sales-quotation',
                visitation_output: '/visitation/:user_ptnr_id/output',
                visitation_periode: '/visitation/periode',
                visitation_goal: '/visitation/:userid/goal',
                visitation_code: '/visitation/:userid/code',
                visitation_customer: '/visitation/customer',
                visitation_type: '/visitation/type',
                visitation_visit: '/visitation/visit'
            },
            SalesQuotation: {
                index: '/sales-quotation',
                invitation: '/sales-quotation/:ptnr_id/invitation',
                invitation_schedule: '/sales-quotation/:visit_code/invitation-schedule'
            },
            Auth: {
                admin_profile: '/admin-profile'
            }
        }
    }
}

module.exports = route