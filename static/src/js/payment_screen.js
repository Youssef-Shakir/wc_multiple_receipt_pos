/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { range } from "@web/core/utils/numbers";
import { _t } from "@web/core/l10n/translation";
import { OrderReceipt } from "@point_of_sale/app/screens/receipt_screen/receipt/order_receipt";
import { PosStore } from "@point_of_sale/app/store/pos_store";

//
patch(PosStore.prototype, {


    async printReceipt({
    basic = false,
    order = this.get_order(),
    printBillActionTriggered = false,
    } = {}) {
        if (this.config.multi_receipt_print){
            this.new_temp_variable = false
            for (var print_time of range(0,this.config.receipt_print_time)) {
                const result = await this.printer.print(
                OrderReceipt,
                {
                    data: this.orderExportForPrinting(order),
                    formatCurrency: this.env.utils.formatCurrency,
                    basic_receipt: basic,
                },
                { webPrintFallback: true }
                );
                this.new_temp_variable = result
            }
            setTimeout(async() =>{
                if (this.new_temp_variable && !printBillActionTriggered) {
                    order.nb_print = order.nb_print ? order.nb_print + 1 : 1;
                    if (typeof order.id === "number" && this.new_temp_variable) {
                        await this.data.write("pos.order", [order.id], { nb_print: order.nb_print });
                    }
                } else if (!order.nb_print) {
                    order.nb_print = 0;
                }
                if (this.new_temp_variable?.warningCode) {
                    this.displayPrinterWarning(this.new_temp_variable, _t("Receipt Printer"));
                }
                return this.new_temp_variable;
            })

       }else{
            const result = await this.printer.print(
                OrderReceipt,
                {
                    data: this.orderExportForPrinting(order),
                    formatCurrency: this.env.utils.formatCurrency,
                    basic_receipt: basic,
                },
                { webPrintFallback: true }
            );
            if (!printBillActionTriggered) {
                order.nb_print = order.nb_print ? order.nb_print + 1 : 1;
                if (typeof order.id === "number" && result) {
                    await this.data.write("pos.order", [order.id], { nb_print: order.nb_print });
                }
            } else if (!order.nb_print) {
                order.nb_print = 0;
            }
            if (result?.warningCode) {
                this.displayPrinterWarning(result, _t("Receipt Printer"));
            }
            return result;

       }

    }
});
