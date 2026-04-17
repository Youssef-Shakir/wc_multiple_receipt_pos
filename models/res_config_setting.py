# -*- coding: utf-8 -*-
# Part of Wicoders Solution. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    pos_multi_receipt_print= fields.Boolean(related='pos_config_id.multi_receipt_print')
    pos_receipt_print_time = fields.Integer(related='pos_config_id.receipt_print_time')

