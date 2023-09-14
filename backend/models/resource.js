"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ResourceSchema = new mongoose_1.Schema({
    agency_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'GovernmentAgency',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
var Resource = (0, mongoose_1.model)('Resource', ResourceSchema);
exports.default = Resource;
