"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appointmentSchema = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Appointment = mongoose_1.default.model("Appointment", appointmentSchema);
