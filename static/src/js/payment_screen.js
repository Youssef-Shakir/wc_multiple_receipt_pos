/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    async printReceipt(options = {}) {
        // Check if multi-receipt is enabled and there's a valid current order
        const currentOrder = this.get_order();
        const canMultiPrint = this.config.multi_receipt_print && currentOrder;
        const printCount = canMultiPrint ? (this.config.receipt_print_time || 1) : 1;

        let result;
        for (let i = 0; i < printCount; i++) {
            result = await super.printReceipt(options);
        }

        return result;
    }
});
