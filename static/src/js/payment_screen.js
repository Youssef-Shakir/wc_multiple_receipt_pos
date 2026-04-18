/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";
import { OrderReceipt } from "@point_of_sale/app/screens/receipt_screen/receipt/order_receipt";

patch(PosStore.prototype, {
    async printReceipt({
        basic = false,
        order,
        printBillActionTriggered = false,
    } = {}) {
        // Always get current order if not provided or undefined
        if (!order) {
            order = this.get_order();
        }
        if (!order) {
            console.error('[MultiReceipt] No order available for printing');
            return false;
        }

        let result = true;
        const printCount = this.config.multi_receipt_print ? (this.config.receipt_print_time || 1) : 1;

        for (let i = 0; i < printCount; i++) {
            // Get fresh print data for each iteration
            const printData = {
                data: this.orderExportForPrinting(order),
                formatCurrency: this.env.utils.formatCurrency,
                basic_receipt: basic,
            };

            result = await this.printer.print(
                OrderReceipt,
                printData,
                { webPrintFallback: true }
            );
        }

        if (!printBillActionTriggered) {
            order.nb_print += 1;
            if (typeof order.id === "number" && result) {
                await this.data.write("pos.order", [order.id], { nb_print: order.nb_print });
            }
        }
        return true;
    }
});
