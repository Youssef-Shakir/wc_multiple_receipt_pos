/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    async printReceipt(options = {}) {
        const printCount = this.config.multi_receipt_print ? (this.config.receipt_print_time || 1) : 1;

        let result;
        for (let i = 0; i < printCount; i++) {
            // Call the original printReceipt method
            result = await super.printReceipt(options);
        }

        return result;
    }
});
