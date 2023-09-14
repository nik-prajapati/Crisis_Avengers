"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../config/db");
var request_1 = require("../models/request");
var resource_1 = require("../models/resource");
var sampleGovernmentAgencies = [
    {
        name: 'Mumbai Municipal Corporation 1',
        description: 'Local Government Office',
        email: 'mumbai.gov1@example.com',
        phone: ['123-456-7890'],
        location: { latitude: 19.076, longitude: 72.8777 },
        address: '123 Municipal Building, Mumbai, India',
        type: 'Official',
    },
    {
        name: 'Mumbai Municipal Corporation 2',
        description: 'Local Government Office',
        email: 'mumbai.gov2@example.com',
        phone: ['123-456-7890'],
        location: { latitude: 19.08, longitude: 72.899 },
        address: '123 Municipal Building, Mumbai, India',
        type: 'Official',
    },
    {
        name: 'Mumbai Municipal Corporation 3',
        description: 'Local Government Office',
        email: 'mumbai.gov3@example.com',
        phone: ['123-456-7890'],
        location: { latitude: 19.04, longitude: 72.1 },
        address: '123 Municipal Building, Mumbai, India',
        type: 'Official',
    },
    {
        name: 'Mumbai Municipal Corporation 4',
        description: 'Local Government Office',
        email: 'mumbai.gov4@example.com',
        phone: ['123-456-7890'],
        location: { latitude: 19.08, longitude: 72.885 },
        address: '456 Civic Center, Mumbai, India',
        type: 'Official',
    },
    {
        name: 'Mumbai Municipal Corporation 5',
        description: 'Local Government Office',
        email: 'mumbai.gov5@example.com',
        phone: ['123-456-7890'],
        location: { latitude: 19.095, longitude: 72.86 },
        address: '789 City Hall, Mumbai, India',
        type: 'Official',
    },
    {
        name: 'Mumbai Municipal Corporation 6',
        description: 'Local Government Office',
        email: 'mumbai.gov6@example.com',
        phone: ['123-456-7890'],
        location: { latitude: 19.07, longitude: 72.875 },
        address: '101 Civic Plaza, Mumbai, India',
        type: 'Official',
    },
    {
        name: 'Mumbai Municipal Corporation 7',
        description: 'Local Government Office',
        email: 'mumbai.gov7@example.com',
        phone: ['123-456-7890'],
        location: { latitude: 19.085, longitude: 72.865 },
        address: '222 Civic Center, Mumbai, India',
        type: 'Official',
    },
];
var sampleRescueAgencies = [
    {
        name: 'Mumbai Rescue Foundation 1',
        description: 'NGO Providing Disaster Relief',
        email: 'rescue.ngo.mumbai1@example.com',
        phone: ['999-888-7777'],
        location: { latitude: 19.0295, longitude: 72.8654 },
        address: '101 Relief Center, Mumbai, India',
        type: 'NGO',
    },
    {
        name: 'Mumbai Rescue Foundation 2',
        description: 'NGO Providing Disaster Relief',
        email: 'rescue.ngo.mumbai2@example.com',
        phone: ['999-888-7777'],
        location: { latitude: 19.04, longitude: 73.0 },
        address: '101 Relief Center, Mumbai, India',
        type: 'NGO',
    },
    {
        name: 'Mumbai Rescue Foundation 3',
        description: 'NGO Providing Disaster Relief',
        email: 'rescue.ngo.mumbai3@example.com',
        phone: ['999-888-7777'],
        location: { latitude: 19.027, longitude: 72.81 },
        address: '101 Relief Center, Mumbai, India',
        type: 'NGO',
    },
    {
        name: 'Mumbai Rescue Foundation 4',
        description: 'NGO Providing Disaster Relief',
        email: 'rescue.ngo.mumbai4@example.com',
        phone: ['999-888-7777'],
        location: { latitude: 19.035, longitude: 72.855 },
        address: '456 Relief Road, Mumbai, India',
        type: 'NGO',
    },
    {
        name: 'Mumbai Rescue Foundation 5',
        description: 'NGO Providing Disaster Relief',
        email: 'rescue.ngo.mumbai5@example.com',
        phone: ['999-888-7777'],
        location: { latitude: 19.045, longitude: 72.87 },
        address: '789 Aid Avenue, Mumbai, India',
        type: 'NGO',
    },
    {
        name: 'Mumbai Fire Department',
        description: 'Fire...',
        email: 'mumbai.fire.dept@example.com',
        phone: ['999-888-7777'],
        location: { latitude: 19.03, longitude: 72.86 },
        address: 'Fire Dept, Mumbai, India',
        type: 'Official',
    },
    {
        name: 'Mumbai Food Department',
        description: 'Bhau Vadapav',
        email: 'bhau@spit.ac.in',
        phone: ['999-888-7777'],
        location: { latitude: 19.04, longitude: 72.875 },
        address: 'Ghatkopar, India',
        type: 'Official',
    },
];
var sampleRequests = [
    {
        govt_requester_id: new mongoose_1.default.Types.ObjectId('6501f2d76d5b47ed6214311d'),
        requester_type: 'government',
        requested_items: [
            {
                type: 'Medical',
                name: 'First Aid Kits 1',
                qty: 5,
                unit: 'kits',
            },
        ],
        status: 'Pending',
        location: { latitude: 19.1, longitude: 72.8667 },
    },
    {
        rescue_requester_id: new mongoose_1.default.Types.ObjectId('6501f2da6d5b47ed6214312b'),
        requester_type: 'rescue',
        requested_items: [
            {
                type: 'Food',
                name: 'Rice',
                qty: 20,
                unit: 'kg',
            },
        ],
        status: 'Approved',
        location: { latitude: 19.11, longitude: 72.87 },
    },
    {
        govt_requester_id: new mongoose_1.default.Types.ObjectId('6501f2d76d5b47ed6214311d'),
        requester_type: 'government',
        requested_items: [
            {
                type: 'Medical',
                name: 'First Aid Kits',
                qty: 5,
                unit: 'kits',
            },
        ],
        status: 'Pending',
        location: { latitude: 19.09, longitude: 72.85 },
    },
    {
        govt_requester_id: new mongoose_1.default.Types.ObjectId('6501f2d76d5b47ed6214311f'),
        requester_type: 'government',
        requested_items: [
            {
                type: 'Medical',
                name: 'Injections',
                qty: 10,
                unit: 'pieces',
            },
            {
                type: 'Food',
                name: 'Canned Food',
                qty: 30,
                unit: 'cans',
            },
        ],
        status: 'Approved',
        location: { latitude: 19.095, longitude: 72.855 },
    },
];
var sampleResources = [
    {
        agency_id: new mongoose_1.default.Types.ObjectId('6501f2da6d5b47ed6214312a'),
        type: 'Medical',
        name: 'Bandages',
        quantity: 100,
        unit: 'pieces',
    },
    {
        agency_id: new mongoose_1.default.Types.ObjectId('6501f2da6d5b47ed62143128'),
        type: 'Medical',
        name: 'Injections',
        quantity: 500,
        unit: 'pieces',
    },
    {
        agency_id: new mongoose_1.default.Types.ObjectId('6501f2da6d5b47ed6214312b'),
        type: 'Food',
        name: 'Canned Food',
        quantity: 200,
        unit: 'cans',
    },
];
function populateDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    // await GovtAgency.insertMany(sampleGovernmentAgencies);
                    // await RescueAgency.insertMany(sampleRescueAgencies);
                    return [4 /*yield*/, request_1.default.insertMany(sampleRequests)];
                case 1:
                    // await GovtAgency.insertMany(sampleGovernmentAgencies);
                    // await RescueAgency.insertMany(sampleRescueAgencies);
                    _a.sent();
                    return [4 /*yield*/, resource_1.default.insertMany(sampleResources)];
                case 2:
                    _a.sent();
                    console.log('Sample data populated successfully.');
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error populating sample data:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    mongoose_1.default.connection.close();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, populateDatabase()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
