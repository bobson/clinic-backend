"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Patient_1 = require("./models/Patient");
const Appointment_1 = require("./models/Appointment");
exports.resolvers = {
    Query: {
        patients: async () => {
            return await Patient_1.Patient.find();
        },
        patient: async (_, { id }) => {
            return await Patient_1.Patient.findById(id);
        },
        appointments: async () => await Appointment_1.Appointment.find().populate("patientId"),
    },
    Mutation: {
        addPatient: async (_, { name, email, phone }) => {
            const newPatient = new Patient_1.Patient({ name, email, phone });
            return await newPatient.save();
        },
        updatePatient: async (_, { id, name, email, phone, }) => {
            const updatedPatient = await Patient_1.Patient.findByIdAndUpdate(id, { $set: { name, email, phone } }, { new: true });
            return updatedPatient;
        },
        deletePatient: async (_, { id }) => {
            const deleted = await Patient_1.Patient.findByIdAndDelete(id);
            return !!deleted;
        },
        addAppointment: async (_, { input }) => {
            // Convert date to ISO string before saving
            const appointmentData = {
                ...input,
                date: new Date(input.date),
            };
            return await Appointment_1.Appointment.create(appointmentData);
        },
        updateAppointment: async (_, { input }) => {
            const { id, date, ...rest } = input;
            const updateData = {
                ...rest,
            };
            if (date) {
                updateData.date = new Date(date);
            }
            return await Appointment_1.Appointment.findByIdAndUpdate(id, updateData, { new: true });
        },
        deleteAppointment: async (_, { id }) => {
            await Appointment_1.Appointment.findByIdAndDelete(id);
            return true;
        },
    },
    Appointment: {
        patient: async (appointment) => {
            return await Patient_1.Patient.findById(appointment.patientId);
        },
        date: (appointment) => {
            return new Date(appointment.date).toISOString(); // ✅ ensure ISO string
        },
    },
};
