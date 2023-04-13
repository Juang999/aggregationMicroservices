const axios = require('axios')
const orderMicroservice = 'http://192.168.8.128:3000'

const PlansController = {
    getPlan: (req, res) => {
        axios.get(`${orderMicroservice}/plans/get-plan`, {
            headers: {
                "authorization": req.get("authorization")
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "success to get data",
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

module.exports = PlansController