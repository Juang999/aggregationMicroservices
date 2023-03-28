// this controller for PK (Product Knowledge)
const axios = require('axios')
const orderMicroservice = 'http://192.168.8.128:3000/product'
const ProductKnowledgeMicroservice = 'http://192.168.8.128:8001/api'


let PKController = {
    index: async (req, res) => {
        try {
            let params = (!req.query.page) ? 1 : req.query.page
            let dataExapro = await axios.get(orderMicroservice+'/index?page='+params)
            
            for (const dataFromExapro of dataExapro.data.data.data) {
                if (dataFromExapro.pt_clothes_id == null) {
                    dataFromExapro.image = 'https://th.bing.com/th/id/OIP.r9Zvt3xyXchx4hdU8-9zrQAAAA?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                } else if (dataFromExapro.pt_clothes_id != null) {
                    let image = await axios.get(`${ProductKnowledgeMicroservice}/product/firstPhoto/${dataFromExapro.pt_clothes_id}`)
                    dataFromExapro.image = image.data.data
                }
            }

            res.status(200)
                .json({
                    status: "berhasil",
                    message: "berhasil mengambil data",
                    result: dataExapro.data.data
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal mengambil data",
                    error: error.message
                })
        }
    },
    show: async (req, res) => {
        try {
            let master_data = await axios.get(orderMicroservice+`/show/${req.params.id}`)

            console.log(master_data.data.data.data.pt_desc2)

            if (master_data.data.data.data.pt_clothes_id == null) {
                res.status(300)
                    .json({
                        status: 'gagal',
                        message: 'deskripsi belum tersedia'
                    })
                return
            }

            let detail_product = await axios.get(ProductKnowledgeMicroservice+`/product/${master_data.data.data.data.pt_clothes_id}`)

            let data_ready = {
                product_name: master_data.data.data.data.pt_desc2,
                detail_data: detail_product.data.data,
                en_mstr: master_data.data.data.data.EnMstr,
                color: master_data.data.data.color
            }

            console.log(data_ready)

            res.status(200)
                .json({
                    status: 'success',
                    message: 'success to get data',
                    data: data_ready
                })
        } catch (error) {
            console.log(error)
            res.status(400)
                .json({
                    status: "failed",
                    message: "failed to get data",
                    error: error.response.data.message
                })
        }
    },
    showSize: async (req, res) => {
        try {
            let data = await axios.get(`${orderMicroservice}/product/${req.params.product}/color/${req.params.color}`)

            res.status(200)
                .json({
                    status: "success",
                    message: "success to get size",
                    data: data.data.data
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "failed",
                    message: "failed to get data",
                    error: error.message
                })
        }
    }
}

module.exports = PKController