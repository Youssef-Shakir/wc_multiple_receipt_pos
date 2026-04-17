# -*- coding: utf-8 -*-
# Part of Wicoders Solution. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class PosConfig(models.Model):
    _inherit = "pos.config"

    multi_receipt_print = fields.Boolean(string='Multi Receipt Print')
    receipt_print_time = fields.Integer(string='Receipt Print Time')

