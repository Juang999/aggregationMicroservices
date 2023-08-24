const axios = require('axios')
const microservice = require('../../../../config/microservice')
const orderMicroservice = microservice.ordermicroservice
const ProductKnowledgeMicroservice = microservice.productknowledgemicroservice

class Product {
    getProductByPriceList = async (req, res) => {
        try {
            let page = (!req.query.page) ? 1 : req.query.page
            let searchQuery = (req.query.query) ? req.query.query : ''
            let priceListOid = (req.query.pricelist_oid) ? req.query.pricelist_oid : ''
            let entity = (req.query.entity) ? req.query.entity : ''
            let category = (req.query.category) ? req.query.category : ''
            let subcategory = (req.query.subquery) ? req.query.subcategory : ''

            let dataExapro = await axios.get(`${orderMicroservice}/order-service/client/product/price-list?pi_oid=${priceListOid}&page=${page}&query=${searchQuery}&entity=${entity}&category=${category}&subcategory=${subcategory}`, {
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
    }

    showProductByPriceList = async (req, res) => {
        try {
            let master_data = await axios.get(`${orderMicroservice}/order-service/client/product/price-list/${req.params.pt_id}/show?price_list=${req.params.pi_oid}`, {
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
    }

    getProductByLocation = async (req, res) => {
        try {
            let page = (!req.query.page) ? 1 : req.query.page
            let searchQuery = (req.query.query) ? req.query.query : ''
            let locationId = (req.query.location_id) ? req.query.location_id : ''
            let entity = (req.query.entity) ? req.query.entity : ''
            let category = (req.query.category) ? req.query.category : ''
            let subcategory = (req.query.subquery) ? req.query.subcategory : ''

            let dataExapro = await axios.get(`${orderMicroservice}/order-service/client/product/price-list?loc_id=${locationId}&page=${page}&query=${searchQuery}&entity=${entity}&category=${category}&subcategory=${subcategory}`, {
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
    }

    showProductByLocation = async (req, res) => {
        try {
            let master_data = await axios.get(`${orderMicroservice}/order-service/client/product/location/${req.params.pt_id}/show?entity=${req.params.entity}`, {
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
    }

    getPrice = (req, res) => {
        axios.get(`${orderMicroservice}/order-service/client/product/price`, {
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
    }

    getCategory = (req, res) => {
        axios.get(`${orderMicroservice}/order-service/client/product/category`, {
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
    }

    getSubCategory = (req, res) => {
        axios.get(`${orderMicroservice}/order-service/client/product/category/${req.params.cat_id}/sub_category`, {
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
    }

    getSize = (req, res) => {
        axios.get(`${orderMicroservice}/order-service/client/product/size`, {
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
    }

    getGrade = (req, res) => {
        axios.get(`${orderMicroservice}/order-service/client/product/grade`, {
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
    }
}

module.exports = new Product()