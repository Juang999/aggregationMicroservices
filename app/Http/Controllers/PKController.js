// this controller for PK (Product Knowledge)
const axios = require('axios')
const PKmicroservice = 'http://192.168.8.128:8001/api'
const {Bridge} = require('../../../models')

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
    },
    show: (req, res) => {
        axios.get(PKmicroservice+`/product/${req.params.id}`)
            .then(result => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'success to get data',
                        data: result.data.data
                    })
            }).catch(err => {
                res.status(400)
                    .json({
                        statu: 'failed',
                        message: 'failed to get data',
                        error: err.message
                    })
            })
    },
    bridge: (req, res) => {
        Bridge.create({
            atpo_id: req.body.atpo_id,
            exapro_pt_id: req.body.exapro_pt_id
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'success to upload bridge data',
                    data: result
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'failed to upload bridge data',
                    err: err.message
                })
        })
    }
}

module.exports = PKController