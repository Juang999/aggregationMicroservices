const axios = require('axios')
const {ordermicroservice} = require('../../../../config/microservice')

class ReportController {
    getTotalPercentageOfSales = (req, res) => {
        let startDate = (req.query.start_date) ? req.query.start_date : ''
        let endDate = (req.query.end_date) ? req.query.end_date : ''

        axios.get(`${ordermicroservice}/order-service/client/report/so?start_date=${startDate}&end_date=${endDate}`, {
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
                    status: 'failed!',
                    data: null,
                    error: err.response.data.error
                })
        })
    }
}

module.exports = new ReportController()