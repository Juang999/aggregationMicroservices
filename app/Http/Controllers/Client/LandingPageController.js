const {get: axiosGet} = require('axios')
const {ordermicroservice, productknowledgemicroservice} = require('../../../../config/microservice')

class LandingPageController {
    getCategory = async (req, res) => {
        try {
            let dataOrder = await axiosGet(`${ordermicroservice}/order-service/client/landingpage/category`)

            let result = await this.getImage(dataOrder.data.data)

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
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

    getBestSeller = async (req, res) => {
        try {
            let dataOrder = await axiosGet(`${ordermicroservice}/order-service/client/landingpage/best-seller`)

            let result = await this.getImageBestSeller(dataOrder.data.data)

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
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

    getImage = async (dataOrderMicroservice) => {
        let result = []
        
        for (const dataOrder of dataOrderMicroservice) {
            let {data: dataImage} = await axiosGet(`${productknowledgemicroservice}/exapro/${dataOrder.product_code}/image`)

            result.push({
                ptcat_id: dataOrder.ptcat_id,
                ptcat_desc: dataOrder.ptcat_desc,
                photo: dataImage.data,
                total_product: dataOrder.total_product
            })
        }

        return result
    }

    getImageBestSeller = async (dataOrderMicroservice) => {
        let result = []
        
        for (const dataOrder of dataOrderMicroservice) {
            let {data: dataImage} = await axiosGet(`${productknowledgemicroservice}/exapro/${dataOrder.product_code}/image`)

            result.push({
                pt_id: dataOrder.sod_pt_id,
                pt_desc1: dataOrder.pt_desc1,
                product_code: dataOrder.product_code,
                photo: dataImage.data,
                category: dataOrder.ptcat_desc,
                sub_category: dataOrder.ptscat_desc,
                total_product: dataOrder.sod_qty
            })
        }

        return result
    }
}

module.exports = new LandingPageController()