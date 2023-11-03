const {ordermicroservice} = require('../../../../config/microservice')
const axios = require('axios')
const moment = require('moment')

class PointofSalesController {
    getLastItemShipped = (req, res) => {
        let defaultEndTimestamp = (req.query.last_date) ? req.query.last_date : ''
        let salesProgram = (req.query.sales_program) ? req.query.sales_program : ''

        axios.get(`${ordermicroservice}/order-service/client/point-of-sales/${req.params.warehouse_id}/product-consigment?last_date=${defaultEndTimestamp}&sales_program=${salesProgram}`, {
            headers: {
                authorization: req.headers['authorization']
            }
        })
            .then(result => {
                res.status(200)
                    .json({
                        code: 200,
                        status: 'berhasil',
                        data: result.data.data,
                        error: null
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        code: 400,
                        status: err.response.data.status,
                        data: null,
                        error: err.response.data.error
                    })
            })
    }
}

module.exports = new PointofSalesController()