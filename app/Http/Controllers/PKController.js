// this controller for PK (Product Knowledge)
const axios = require('axios')
const orderMicroservice = 'http://192.168.8.128:3000'
const ProductKnowledgeMicroservice = 'http://192.168.8.128:8001/api'

let PKController = {
    index: async (req, res) => {
        try {
            let params = (!req.query.page) ? 1 : req.query.page
            let searchQuery = (req.query.query) ? req.query.query : ''
            let dataExapro = await axios.get(`${orderMicroservice}/product/index?page=${params}&query=${searchQuery}`, {
                headers: {
                    "authorization": req.headers["authorization"]
                }
            })

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
                    status: "success",
                    message: "berhasil mengambil data",
                    result: dataExapro.data.data
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil data",
                    error: error.message
                })
        }
    },
    show: async (req, res) => {
        try {
            let master_data = await axios.get(orderMicroservice+`/product/show/${req.params.id}`, {
                headers: {
                    "authorization": req.headers["authorization"]
                }
            })

            console.log('hello world')

            if (master_data.data.data.data.pt_clothes_id == null) {
                res.status(300)
                    .json({
                        status: 'success',
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

            res.status(200)
                .json({
                    status: 'success',
                    message: 'berhasil mengambil data',
                    data: data_ready
                })
        } catch (error) {
            console.log(error)
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal megnambil data",
                    error: error.response.data.message
                })
        }
    },
    showSize: (req, res) => {
        axios.get(`${orderMicroservice}/product/product/${req.params.product}/color/${req.params.color}`, {
            headers: {
                "authorization": req.headers["authorization"]
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil size",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil size",
                    error: err.message
                })
        })
    },
    getAgent: (req, res) => {
        axios.get(`${orderMicroservice}/master/group`, {
            headers: {
                "authorization": req.headers["authorization"]
            }
        })
            .then(result => {
                res.status(200)
                    .json({
                        status: "success",
                        message: "berhasil mengambil data",
                        data: result.data.data
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(400)
                    .json({
                        status: "failed",
                        message: "gagal mengambil data",
                        error: err.message
                    })
            })
    },
    getTypeOfPrice: (req, res) => {
        axios.get(`${orderMicroservice}/price/price/${req.params.group_id}`, {
            headers: {
                "authorization": req.get("authorization")
            }
        })
            .then(result => {
                res.status(200)
                    .json({
                        status: "success",
                        message: "berhasil mengambil data",
                        data: result.data.data
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: "failed",
                        message: "gagal mengambil data",
                        error: err.message
                    })
            })
    },
    getPaymentType: (req, res) => {
        axios.get(`${orderMicroservice}/product/product/${req.params.product}/color/${req.params.color}/size/${req.params.size}/price/${req.params.price_type}/entity/${req.params.en_id}/grade/${req.params.grade}`, {
            headers: {
                "authorization": req.get("authorization")
            }
        })
            .then(result => {
                res.status(200)
                    .json({
                        status: "success",
                        message: "berhasil mengambil data",
                        data: result.data.data
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(400)
                    .json({
                        status: "failed",
                        message: "gagal mengambil data",
                        error: err.message
                    })
            })
    },
    getGrade: (req, res) => {
        axios.get(`${orderMicroservice}/product/product/${req.params.product}/color/${req.params.color_id}/size/${req.params.size_id}`, {
            headers: {
                "authorization": req.get("authorization")
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil data grade",
                    data: result.data.data
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil data grade",
                    error: err.resposne.data
                })
        })
    },
    getCategory: (req, res) => {
        axios.get(`${orderMicroservice}/product/category`, {
            headers: {
                "authorization": req.get("authorization")
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
    },
    getSubCategory: (req, res) => {
        axios.get(`${orderMicroservice}/product/category/sub_category/${req.params.cat_id}`, {
            headers: {
                "authorization": req.get("authorization")
            }
        })
            .then(result => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: "berhasil mengambil data",
                        data: result.data.data
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: "failed",
                        message: "gagal mengambil data",
                        error: err.message
                    })
            })
    },
    getSize: (req, res) => {
        axios.get(`${orderMicroservice}/product/size`, {
            headers: {
                "authorization": req.get("authorization")
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
    },
    getProductFilteredWithCategory: async (req, res) => {
        try {
            let page = (req.query.page) ? req.query.page : 1

            let dataExapro = await axios.get(`${orderMicroservice}/product/product/category/${req.params.category_id}?page=${page}`, {
                headers: {
                    "authorization": req.get("authorization")
                }
            })

            for (const dataFromExapro of dataExapro.data.data.theData) {
                if (dataFromExapro.pt_clothes_id == null) {
                    dataFromExapro.image = 'https://th.bing.com/th/id/OIP.r9Zvt3xyXchx4hdU8-9zrQAAAA?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                } else if (dataFromExapro.pt_clothes_id != null) {
                    let image = await axios.get(`${ProductKnowledgeMicroservice}/product/firstPhoto/${dataFromExapro.pt_clothes_id}`)
                    dataFromExapro.image = image.data.data
                }
            }

            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil data",
                    data: dataExapro.data.data
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambiil data",
                    error: error.message
                })
        }
    }
}

module.exports = PKController