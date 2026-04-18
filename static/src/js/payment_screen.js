/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    async printReceipt(options = {}) {
        // Always do the first print
        const result = await super.printReceipt(options);

        // Check if multi-receipt is enabled for additional prints
        if (this.config.multi_receipt_print && this.config.receipt_print_time > 1) {
            const additionalPrints = this.config.receipt_print_time - 1;
            for (let i = 0; i < additionalPrints; i++) {
                await super.printReceipt(options);
            }
        }

        return result;
    }
});
