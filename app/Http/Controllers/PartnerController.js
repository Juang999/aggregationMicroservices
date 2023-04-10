const axios = require('axios')
const orderMicroservice = 'http://192.168.8.128:3000'

const PartnerController = {
    getPartner: (req, res) => {
        axios.get(`${orderMicroservice}/partner/partner`, {
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

module.exports = PartnerController