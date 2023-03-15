// this controller for PK (Product Knowledge)
const axios = require('axios')
const PKmicroservice = 'http://192.168.8.128:3000/product'

let PKController = {
    index: async (req, res) => {
        let params = (!req.query.page) ? 1 : req.query.page
        axios.get(PKmicroservice+'/index?page='+params)
            .then(result => {
                res.status(200)
                    .json({
                        status: "berhasil",
                        message: "berhasil mengambil data",
                        data: result.data.data
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: "gagal",
                        message: "gagal mengambil data",
                        error: err.message
                    })
            })
    },
    show: async (req, res) => {
        try {
            let master_data = await axios.get(PKmicroservice+`/show/${req.params.id}`)
            
            if (master_data.data.data.pt_clothes_id == null) {
                res.status(300)
                    .json({
                        status: 'gagal',
                        message: 'deskripsi belum tersedia'
                    })
                return
            }

            res.status(200)
                .json({
                    status: 'success',
                    message: 'success to get data',
                    data: result.data.data
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "failed",
                    message: "failed to get data",
                    error: error.response.data.message
                })
        }

    }
}

module.exports = PKController