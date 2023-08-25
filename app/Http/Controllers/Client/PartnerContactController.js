const axios = require('axios')
const microservice = require('../../../../config/microservice')
const orderMicroservice = microservice.ordermicroservice

class PartnerContactController {
    create = (req, res) => {

        axios.post(`${orderMicroservice}/order-service/client/partner-contact-address/`, {
            partnerAccountAddressOid: req.body.partnerAccountAddressOid,
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

    show = (req, res) => {
        axios.get(`${orderMicroservice}/order-service/client/partner-contact-address/${req.params.ptnrac_oid}/detail`, {
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
}

module.exports = new PartnerContactController()