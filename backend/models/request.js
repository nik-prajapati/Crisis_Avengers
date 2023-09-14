"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RequestSchema = new mongoose_1.Schema({
    govt_requester_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'GovernmentAgency',
    },
    rescue_requester_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'RescueAgency',
    },
    requested_items: [
        {
            type: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
                required: true,
            },
        },
    ],
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    status: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
var Request = (0, mongoose_1.model)('Request', RequestSchema);
exports.default = Request;
