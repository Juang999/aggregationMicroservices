const axios = require('axios')
const orderMicroservice = 'http://192.168.56.1:3000'

const PartnerController = {
    getPartner: (req, res) => {
        let page = (req.query.page == null) ? 1 : req.query.page
        let search = (req.query.name != null) ? `&name=${req.query.name}` : ''

        axios.get(`${orderMicroservice}/partner/partner?page=${page + search}`, {
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
    },
    getCustomer: (req, res) => {
        let queryName = (req.query.query) ? req.query.query : ''

        axios.get(`${orderMicroservice}/master/customer?query=${queryName}`, {
            headers: {
                "authorization": req.get("authorization")
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
    },
    createNewCustomer: (req, res) => {
        axios.post(`${orderMicroservice}/partner/create-partner`, {
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
    },
    getDetailCustomer: (req, res) => {
        axios.get(`${orderMicroservice}/partner/detail-partner/${req.params.ptnr_oid}`, {
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
    },
    createAddressCustomer: (req, res) => {
        axios.post(`${orderMicroservice}/partner/create-address-partner`, {
            partnerDomainId: req.body.partnerDomain,
            partnerEntityId: req.body.partnerEntity,
            partnerLine1: req.body.partnerLine1,
            partnerLine2: req.body.partnerLine2,
            partnerLine3: req.body.partnerLine3,
            partnerPhone1: req.body.partnerPhone1,
            partnerPhone2: req.body.partnerPhone2,
            partnerFax1: req.body.partnerFax1,
            partnerFax2: req.body.partnerFax2,
            partnerZip: req.body.partnerZip,
            partnerOid: req.body.partnerOid,
            partnerAddressType: req.body.partnerAddressType,
            partnerComment: req.body.partnerComment,
            ptnra_active: req.body.ptnra_active,
        }, {
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
                    status: "failed",
                    message: "gagal membuat data",
                    error: err.message
                })
        })
    },
    getDetailAddressCustomer: (req, res) => {
        axios.get(`${orderMicroservice}/partner/detail-partner-address/${req.params.ptnra_oid}`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil detail data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: 'gagal mengambil data',
                    error: err.message
                })
        })
    },
    createContactPerson: (req, res) => {
        axios.post(`${orderMicroservice}/partner/create-contact-person`, {
            pertnerAccountAddressOid: req.body.pertnerAccountAddressOid,
            partnerAccountFunction: req.body.partnerAccountFunction,
            partnerContactName: req.body.partnerContactName,
            partnerPhone1: req.body.partnerPhone1,
            partnerContact2: req.body.partnerContact2,
            partnerContactEmail: req.body.partnerContactEmail
        }, {
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
                    status: "failed",
                    message: "gagal membuat data",
                    error: err.message
                })
        })
    }
}

module.exports = PartnerController