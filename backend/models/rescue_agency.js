"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RescueAgencySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    email: {
        type: String,
        required: true,
    },
    phone: [{ type: String }],
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
    address: {
        type: String,
        required: true,
    },
    type: String,
}, {
    timestamps: true,
});
var RescueAgency = (0, mongoose_1.model)('Rescue-Agency', RescueAgencySchema);
exports.default = RescueAgency;
