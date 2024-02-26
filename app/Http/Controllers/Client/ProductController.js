const axios = require('axios')
const microservice = require('../../../../config/microservice')
const orderMicroservice = microservice.ordermicroservice
const ProductKnowledgeMicroservice = microservice.productknowledgemicroservice

class ProductController {
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

            for (const dataFromExapro of dataExapro.data.data) {
                dataFromExapro.image = (!dataFromExapro.pt_code) ? '-' : await this.getImage(dataFromExapro.pt_code)
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

            let desc_data = await axios.get(`${ProductKnowledgeMicroservice}/exapro/${master_data.data.data.pt_code}/description`)

            let data_ready = {
                name_data: master_data.data.data.pt_desc1,
                desc_data: desc_data.data.data,
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

    getProductByLocation = async (req, res) => {
        try {
            let page = (!req.query.page) ? 1 : req.query.page
            let searchQuery = (req.query.query) ? req.query.query : ''
            let locationId = (req.query.location_id) ? req.query.location_id : ''
            let entity = (req.query.entity) ? req.query.entity : ''
            let category = (req.query.category) ? req.query.category : ''
            let subcategory = (req.query.subquery) ? req.query.subcategory : ''

            let dataExapro = await axios.get(`${orderMicroservice}/order-service/client/product/location?loc_id=${locationId}&page=${page}&query=${searchQuery}&entity=${entity}&category=${category}&subcategory=${subcategory}`, {
                headers: {
                    "authorization": req.headers["authorization"]
                }
            })

            for (const dataFromExapro of dataExapro.data.data) {
                dataFromExapro.image = (dataFromExapro.pt_code) ? await this.getImage(dataFromExapro.pt_code) : '-'
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

            let desc_data = await axios.get(`${ProductKnowledgeMicroservice}/exapro/${master_data.data.data.pt_code}/description`)

            let data_ready = {
                name_data: master_data.data.data.pt_desc1,
                desc_data: desc_data.data.data,
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

    getCatalog = async (req, res) => {
        let query = req.query.query;
        let areaid = req.query.areaid;
        let ptCode = req.query.ptcode;
        let entityid = req.query.entityid;

        let getImage = axios.get(`${microservice.productknowledgemicroservice}/exapro/image-catalog`)
        let dataProduct = axios.get(`${orderMicroservice}/order-service/client/product/catalog?entityid=${entityid}&query=${query}&areaid=${areaid}&pt_cat_id=${req.query.pt_cat_id}&ptcode=${ptCode}`)            

        Promise.all([dataProduct, getImage])
            .then(result => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: {
                            data_images: result[1]['data']['data'],
                            data_product: result[0]['data']['data']
                        },
                        error: null
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: 'failed',
                        data: null,
                        error: err.message
                    })
            })
    }

    showDetailCatalog = async (req, res) => {
        try {
            let dataProduct = await axios.get(`${orderMicroservice}/order-service/client/product/catalog/${req.params.pt_id}/detail`)

            dataProduct['data']['data']['image'] = await this.getImage(dataProduct['data']['data']['pt_code'])
            

            res.status(200)
                .json({
                    status: 'success',
                    data: dataProduct['data']['data'],
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    getImage = async (pt_code) => {
        let image = await axios.get(`${microservice.productknowledgemicroservice}/exapro/${pt_code}/image`)

        return image.data.data
    }

    getDescription = async (pt_code) => {
        let detail_product = await axios.get(`${ProductKnowledgeMicroservice}/exapro/${master_data.data.data.pt_code}/description`)

        return detail_product.data.data
    }

}

module.exports = new ProductController()