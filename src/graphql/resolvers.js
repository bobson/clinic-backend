import { Patient } from "./models/Patient.js";
import { Appointment } from "./models/Appointment.js";

export const resolvers = {
  Query: {
    patients: async () => {
      return await Patient.find();
    },
    patient: async (_, { id }) => {
      return await Patient.findById(id);
    },
    appointments: async () => await Appointment.find().populate("patientId"),
  },

  Mutation: {
    addPatient: async (_, { name, email, phone }) => {
      const newPatient = new Patient({ name, email, phone });
      return await newPatient.save();
    },

    updatePatient: async (_, { id, name, email, phone }) => {
      const updatedPatient = await Patient.findByIdAndUpdate(
        id,
        { $set: { name, email, phone } },
        { new: true }
      );
      return updatedPatient;
    },

    deletePatient: async (_, { id }) => {
      const deleted = await Patient.findByIdAndDelete(id);
      return !!deleted;
    },

    addAppointment: async (_, { input }) => {
      const appointmentData = {
        ...input,
        date: new Date(input.date),
      };
      return await Appointment.create(appointmentData);
    },

    updateAppointment: async (_, { input }) => {
      const { id, date, ...rest } = input;
      const updateData = { ...rest };
      if (date) {
        updateData.date = new Date(date);
      }
      return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
    },

    deleteAppointment: async (_, { id }) => {
      await Appointment.findByIdAndDelete(id);
      return true;
    },
  },

  Appointment: {
    patient: async (appointment) => {
      return await Patient.findById(appointment.patientId);
    },
    date: (appointment) => {
      return new Date(appointment.date).toISOString();
    },
  },
};
