const axios = require('axios')
const microservice = require('../../../../config/microservice')
const orderMicroservice = microservice.ordermicroservice

class PartnerAddressController {
    create = (req, res) => {
        axios.post(`${orderMicroservice}/order-service/client/partner-address/`, {
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
    }

    show = (req, res) => {
        axios.get(`${orderMicroservice}/order-service/client/partner-address/${req.params.ptnra_oid}/detail`, {
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

module.exports = new PartnerAddressController()