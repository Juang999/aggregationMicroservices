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
                        visitation_type: '/visitation/type',
                        visitation_visit: '/visitation/visit',
                        visitation_sales: '/visitation/sales',
                        visitation: '/visitation/:ptnr_id/sales',
                        visitation_periode: '/visitation/periode',
                        visitation_customer: '/visitation/customer',
                        visitation_goal: '/visitation/:userid/goal',
                        visitation_code: '/visitation/:userid/code',
                        visitation_create_periode: '/visitation/periode',
                        visitation_detail: '/visitation/:visited_oid/detail',
                        visitation_output: '/visitation/:user_ptnr_id/output',
                        visitation_schedule: '/visitation/:visit_code/schedule',
                        visitation_checkin: '/visitation/:user_ptnr_id/checkin',
                        visitation_sales_quotation: '/visitation/:user_ptnr_id/sales-quotation',
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
            Client: {
                route_client: '/client',
                feature: {
                    report: {
                        report_so: '/so',
                        report_history_debt: '/debt',
                        report_detail_history_debt: '/debt/:ar_oid/detail',
                        report_detail_shipment: '/so/:so_oid/shipment',
                    },
                    product: {
                        product_size: '/size', //10
                        product_grade: '/grade', //
                        product_catalog: '/catalog',
                        product_price_list: '/price', //3
                        product_category: '/category', //7
                        product_get_all: '/get-all-product', //11
                        product_by_location: '/product-by-location/', //done
                        product_catalog_mutifers: '/catalog-mutifers',
                        product_detail_catalog: '/catalog/:pt_id/detail',
                        product_by_price_list: '/product-by-price-list', //done
                        product_sub_category: '/category/sub_category/:cat_id', //9
                        product_detail_by_location: '/detail-product-by-location/:pt_id/entity/:entity', //done
                        product_detail_by_price_list: '/detail-product-by-price-category/:pt_id/pi_oid/:pi_oid', //done
                    },
                    sales_quotation: {
                        sq_site: '/site', //done
                        sq_location: '/location/:en_id', //done
                        sq_sales_quotation: '/get-sales-quotation', //done
                        sq_debt: '/sum-debt-customer/partnerid/:partnerId', //done
                        sq_create_sales_quotation: '/post-sales-quotation', //
                        sq_price_list: '/price-list/partnergroupid/:partnerGroupId', //done
                        sq_limit_credit: '/get-limit-credit-customer/partnerid/:partnerId', //done
                        sq_product: '/get-product/pricelist/:priceListOid/area/:areaId/location/:locId', //done
                        sq_package: '/package',
                        sq_detail_package: 'package/:package_oid/detail'
                    },
                    visitation: {
                        visitation_type: '/get-visit-type', //done
                        visitation_visit: '/people-to-visit', //done
                        visitation_schedule: '/get-visit-schedule', //
                        visitation_checkin: '/checkin/:visited_oid', //
                        visitation_checkout: '/checkout/:visited_oid', //
                        visitation_output_type: '/get-output-visit-type', //done
                        visitation_customer: '/get-all-costomer-per-periode', //
                        visitation_create_schedule: '/create-schedule-visiting', //
                        visitation_delete_schedule: '/delete-schedule/:visit_code', //
                        visitation_sales_periode: '/visitation/:periode/sales-periode', //done
                        visitation_detail_visitation: '/get-detail-visit/:visited_oid', //
                        visitation_detail_schedule: '/get-detail-visit-schedule/:visit_code', //
                        visitation_delete_customer: '/delete-from-list-schedule/:visited_oid', //
                    },
                    partner: {
                        partner_customer: '/get-customer', //0
                        partner_create_customer: '/create-new-customer', //1
                        partner_detail_customer: '/get-detail-customer/:ptnr_oid',
                        partner_mitra: '/mitra',
                        partner_parent: '/parent',
                        partner_warehouse: '/warehouse',
                        partner_location: '/:wh_id/location',
                        partner_partner: '/partner'
                    },
                    partner_address: {
                        partner_create_address: '/create-partner-address', //0 -> toCreateNewAddressCustomer
                        partner_detail_address: '/detail-partner-address/:ptnra_oid', //1 ->toGetDetailAddressCustomer
                    },
                    partner_contact: {
                        partner_create_contact: '/create-contact-address', //0 -> toCreateNewContactPerson
                        partner_detail_contact: '/detail-contact-address/:ptnrac_oid', //1 -> toGetDetailDataContactPerson
                    },
                    planning: {
                        plans_index: '/get-plan', //0/
                        plans_create: '/create-unplan', //1
                        plans_detail: '/planning/:plans_oid/detail' //2
                    },
                    pointofsales: {
                        pos_product_consigment: '/:warehouse_id/consigment'
                    },
                    inventory: {
                        invc_transfer_receipt: '/transfer-receipt',
                        invc_detail_transfer_receipt: '/:ptsfr_oid/detail-transfer-receipt',
                        invc_update_transfer_receipt: '/:ptsfr_oid/update-transfer-receipt',
                        invc_product_from_exapro: '/:ptnr_id/exapro'
                    },
                    landing_page: {
                        landing_page_category: '/category',
                        landing_page_best_seller: '/best-seller',
                        landing_page_carousel: '/carousel'
                    }
                }
            },
            Default: {
                route_default: '/default',
                feature: {
                    product_knowledge: {
                        pk_image: '/:pt_code/image',
                        pk_desc: '/:pt_code/desc'
                    },
                    Master: {
                        master_group: '/group', //done
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
                        master_sales_program: '/sales-program', //done
                    }
                }
            }
        }
    }
}

module.exports = new Route()