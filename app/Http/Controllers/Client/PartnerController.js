const axios = require('axios')
const microservice = require('../../../../config/microservice')
const orderMicroservice = microservice.ordermicroservice

class PartnerController {
    getPartner = (req, res) => {
        let page = (req.query.page == null) ? 1 : req.query.page
        let search = (req.query.search) ? req.query.search : ''

        axios.get(`${orderMicroservice}/order-service/client/partner/?page=${page}&name=${search}`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil data",
                    error: err.message
                })
        })
    }

    createNewCustomer = (req, res) => {
        axios.post(`${orderMicroservice}/order-service/client/partner/`, {
            entityId: req.body.partnerEntity,
            partnerName: req.body.partnerName,
            partnerGroupId: req.body.partnerGroup,
            partnerIsCustomer: req.body.partnerIsCustomer,
            partnerIsVendor: req.body.partnerIsVendor,
            partnerActive: req.body.partnerActive,
            partnerCurrencyId: req.body.partnerCurrencyId,
            partnerIsMember: req.body.partnerIsMember,
            partnerIsEmployee: req.body.partnerIsEmployee,
            partnerIsWriter: req.body.partnerIsWriter,
            partnerTransactionCodeId: req.body.partnerTransactionCodeId,
            partnerEmail: req.body.partnerEmail,
            partnerNameAlternative: req.body.partnerNameAlternative,
            partnerIsPs: req.body.partnerIsPs,
            partnerIsBm: req.body.partnerIsBm,
            partnerSex: req.body.partnerSex,
            partnerBloodGroup: req.body.partnerBloodGroup,
            partnerDateBirthday: req.body.partnerDateBirthday,
            partnerNation: req.body.partnerNation,
            partnerBpDate: req.body.partnerBpDate,
            partnerBpType: req.body.partnerBpType,
            partnerIsVolunteer: req.body.partnerIsVolunteer,
            partnerIsSbm: req.body.partnerIsSbm,
            partnerLine1: req.body.partnerLine1,
            partnerLine2: req.body.partnerLine2,
            partnerLine3: req.body.partnerLine3,
            partnerPhone1: req.body.partnerPhone1,
            partnerPhone2: req.body.partnerPhone2,
            partnerFax1: req.body.partnerFax1,
            partnerFax2: req.body.partnerFax2,
            partnerZip: req.body.partnerZip,
            partnerAddressType: req.body.partnerAddressType,
            partnerComment: req.body.partnerComment,
            ptnra_active: req.body.ptnra_active,
        },{
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil membuat data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal membuat data",
                    error: err.message
                })
        })
    }

    getDetailCustomer = (req, res) => {
        axios.get(`${orderMicroservice}/order-service/client/partner/${req.params.ptnr_oid}/detail`, {
            headers: {
                'authorization': req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: 'berhasil mengambil data',
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil data",
                    error: err.message
                })
        })
    }

    getSalesPartner = (req, res) => {
        axios.get(`${orderMicroservice}/order-service/client/partner/mitra`, {
            headers: {
                authorization: req.get('authorization')
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success!',
                    data: result.data.data,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.response.data.error
                })
        })
    }
}

module.exports = new PartnerController()