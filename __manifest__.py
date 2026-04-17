# -*- coding: utf-8 -*-
# Part of Wicoders Solution. See LICENSE file for full copyright and licensing details

{
    'name': "Multiple Receipt Print In Pos",
    'version': '18.0.0.0.1',
    'category': 'POS',
    'license': 'AGPL-3',
    'summary': 'Multiple Receipt Print In Pos',
    'description': 'In the Odoo POS (Point of Sale) system, the Multiple Receipt Print feature allows users to print multiple receipts from a single transaction.',
    'author': 'Wicoders Solutions',
    'website': 'https://wicoders.com/',
    'depends': ['point_of_sale'],
    'data': [
        'views/pos_view.xml'
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'wc_multiple_receipt_pos/static/src/js/payment_screen.js'
        ],
    },

    'images': ['static/description/banner.png'],
    'installable': True,
    'application': False,
    'auto_install': False,
    "price": 15.80,
    "currency": "USD",
}

