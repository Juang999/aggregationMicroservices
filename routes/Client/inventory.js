const express = require('express')
const router = express.Router()
const Controller = require('../../app/Http/Controllers/Controller')
const {Client} = require('../route')

router.get(Client.feature.inventory.invc_transfer_receipt, Controller.Client.InventoryController.getInventoryTransferReceipt)
router.get(Client.feature.inventory.invc_detail_transfer_receipt, Controller.Client.InventoryController.detailInventoryTransferReceipt)
router.patch(Client.feature.inventory.invc_update_transfer_receipt, Controller.Client.InventoryController.updateTransferReceipt)
router.get(Client.feature.inventory.invc_product_from_exapro, Controller.Client.InventoryController.inventoryPerPartner)

module.exports = router