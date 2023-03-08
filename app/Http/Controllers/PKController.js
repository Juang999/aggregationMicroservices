// this controller for PK (Product Knowledge)
const axios = require('axios')
const PKmicroservice = 'http://192.168.8.128:8001/api'

let PKController = {
    index: async (req, res) => {
        try {
            let params = (!req.query.page) ? 1 : req.query.page

            let data = await axios.get(PKmicroservice+'/product?page='+params);

            res.status(200)
                .json({
                    status: "success",
                    message: "success to get data",
                    data: data.data.data
                })
        } catch (error) {
            res.status(400)
                .json({
                    error: error.message
                })
        }
    }
}

module.exports = PKController