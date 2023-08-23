class Route {
    constructor () {
        return {
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
            },
            Default: {
                route_default: '/default',
                feature: {
                    Master: {
                        master_group: '/group', ///done
                        master_gender: '/gender', //done 
                        master_periode: '/periode', //done
                        master_bp_type: '/bp_type', //done
                        master_citizen: '/citizen', //done
                        master_currency: '/currency', //done
                        master_entity: '/get-entity', //done
                        master_location: '/location', //done
                        master_addr_type: '/addr_type', //done
                        master_blood_group: '/blood_group', //done
                        master_tax_invoice: '/tax_invoice', //done
                        master_payment_type: '/payment-type', //done
                        master_credit_terms: '/creditterms-mstr', //done
                        master_payment_method: '/payment-method', //done
                        master_contact_person: '/contact_person', //done
                        master_default_periode: '/default-periode', //done
                    }
                }
            }
        }
    }
}

module.exports = new Route()