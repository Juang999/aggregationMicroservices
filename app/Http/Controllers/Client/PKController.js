// this controller for PK (Product Knowledge)
const axios = require('axios')
const microservice = require('../../../../config/microservice')
const orderMicroservice = microservice.ordermicroservice
const ProductKnowledgeMicroservice = microservice.productknowledgemicroservice

let PKController = {
    getProductByPriceList: async (req, res) => {
        try {
            let page = (!req.query.page) ? 1 : req.query.page
            let searchQuery = (req.query.query) ? req.query.query : ''
            let priceListOid = (req.query.pricelist_oid) ? req.query.pricelist_oid : ''
            let entity = (req.query.entity) ? req.query.entity : ''
            let category = (req.query.category) ? req.query.category : ''
            let subcategory = (req.query.subquery) ? req.query.subcategory : ''

            let dataExapro = await axios.get(`${orderMicroservice}/product/get-product-by-price-category?pi_oid=${priceListOid}&page=${page}&query=${searchQuery}&entity=${entity}&category=${category}&subcategory=${subcategory}`, {
                headers: {
                    "authorization": req.headers["authorization"]
                }
            })

            for (const dataFromExapro of dataExapro.data.data.data) {
                if (dataFromExapro.pt_clothes_id == null) {
                    dataFromExapro.image = '-'
                } else if (dataFromExapro.pt_clothes_id != null) {
                    let image = await axios.get(`${ProductKnowledgeMicroservice}/image/${dataFromExapro.pt_clothes_id}`)
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
                    error: error.response.data.error
                })
        }
    },
    showProductByPriceCategory: async (req, res) => {
        try {
            let master_data = await axios.get(orderMicroservice+`/product/show-product-by-price-category/${req.params.pt_id}/pi_oid/${req.params.pi_oid}`, {
                headers: {
                    "authorization": req.headers["authorization"]
                }
            })

            if (master_data.data.data.pt_clothes_id == null) {
                default_detail_product = {
                                    id: "-",
                                    entity_name: "-",
                                    article_name: "-",
                                    color: "-",
                                    material: "-",
                                    combo: "-",
                                    special_feature: "-",
                                    keyword: "-",
                                    description: "Deskripsi belum tersedia",
                                    slug: "-",
                                    group_article: "-",
                                    type_id: "-",
                                    is_active: "-",
                                    image: {
                                        "photo": "-"
                                    }
                                }
            } else {
                var detail_product = await axios.get(ProductKnowledgeMicroservice+`/clothes/${master_data.data.data.pt_clothes_id}`)
            }

            let data_ready = {
                name_data: (master_data.data.data.pt_desc2) ? master_data.data.data.pt_desc2 : '-',
                desc_data: (master_data.data.data.pt_clothes_id == null) ? default_detail_product : detail_product.data.data,
                detail_data: master_data.data
            }

            res.status(200)
                .json({
                    status: 'success',
                    message: 'berhasil mengambil data',
                    data: data_ready
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal megnambil data",
                    error: error.response.data.error
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
                res.status(400)
                    .json({
                        status: "failed",
                        message: "gagal mengambil data",
                        error: err.response.data.error
                    })
            })
    },
    getPrice: (req, res) => {
        axios.get(`${orderMicroservice}/price/price`, {
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
                res.status(400)
                    .json({
                        status: "failed",
                        message: "gagal mengambil data",
                        error: err.response.data.error
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
                    error: err.response.data
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
    },
    getAllProduct: (req, res) => {
        let entity = (req.query.entity) ? req.query.entity : 0
        let page = (req.query.page) ? req.query.page : 1
        let query = (req.query.query) ? req.query.query : ''
        let category = (req.query.category) ? req.query.category : ''

        axios.get(`${orderMicroservice}/product/get-all-product?page=${page}&entity=${entity}&query=${query}&category=${category}`)
            .then(result => {
                res.status(200)
                    .json({
                        status: 'berhasil',
                        message: result.data.message,
                        data: result.data.data
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: 'gagal',
                        message: 'gagal mengambil data',
                        error: err.message
                    })
            })
    },
    getProductByLocation: async (req, res) => {
        try {
            let page = (!req.query.page) ? 1 : req.query.page
            let searchQuery = (req.query.query) ? req.query.query : ''
            let locationId = (req.query.location_id) ? req.query.location_id : ''
            let entity = (req.query.entity) ? req.query.entity : ''
            let category = (req.query.category) ? req.query.category : ''
            let subcategory = (req.query.subquery) ? req.query.subcategory : ''

            let dataExapro = await axios.get(`${orderMicroservice}/product/get-product-by-location?loc_id=${locationId}&page=${page}&query=${searchQuery}&entity=${entity}&category=${category}&subcategory=${subcategory}`, {
                headers: {
                    "authorization": req.headers["authorization"]
                }
            })

            for (const dataFromExapro of dataExapro.data.data.data) {
                if (dataFromExapro.pt_clothes_id == null) {
                    dataFromExapro.image = '-'
                } else if (dataFromExapro.pt_clothes_id != null) {
                    let image = await axios.get(`${ProductKnowledgeMicroservice}/image/${dataFromExapro.pt_clothes_id}`)
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
                    error: error.response.data.error
                })
        }
    },
    showProductByLocation: async (req, res) => {
        try {
            let master_data = await axios.get(orderMicroservice+`/product/show-product-by-location/${req.params.pt_id}/entity/${req.params.entity}`, {
                headers: {
                    "authorization": req.headers["authorization"]
                }
            })

            if (master_data.data.data.pt_clothes_id == null) {
                res.status(300)
                    .json({
                        status: 'success',
                        message: 'deskripsi belum tersedia'
                    })
                return
            }

            let detail_product = await axios.get(ProductKnowledgeMicroservice+`/clothes/${master_data.data.data.pt_clothes_id}`)

            let data_ready = {
                name_data: master_data.data.data.pt_desc2,
                desc_data: detail_product.data.data,
                detail_data: master_data.data.data
            }

            res.status(200)
                .json({
                    status: 'success',
                    message: 'berhasil mengambil data',
                    data: data_ready
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal megnambil data",
                    error: error.response.data.error
                })
        }
    },
}

module.exports = PKController