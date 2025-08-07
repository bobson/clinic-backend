import { Patient } from "./models/Patient";
import { Appointment } from "./models/Appointment";

export const resolvers = {
  Query: {
    patients: async () => {
      return await Patient.find();
    },
    patient: async (_: any, { id }: { id: string }) => {
      return await Patient.findById(id);
    },
    appointments: async () => await Appointment.find().populate("patientId"),
  },

  Mutation: {
    addPatient: async (_: any, { name, email, phone }: any) => {
      const newPatient = new Patient({ name, email, phone });
      return await newPatient.save();
    },

    updatePatient: async (
      _: any,
      {
        id,
        name,
        email,
        phone,
      }: { id: string; name?: string; email?: string; phone?: string }
    ) => {
      const updatedPatient = await Patient.findByIdAndUpdate(
        id,
        { $set: { name, email, phone } },
        { new: true }
      );
      return updatedPatient;
    },

    deletePatient: async (_: any, { id }: { id: string }) => {
      const deleted = await Patient.findByIdAndDelete(id);
      return !!deleted;
    },

    addAppointment: async (_: any, { input }: any) => {
      // Convert date to ISO string before saving
      const appointmentData = {
        ...input,
        date: new Date(input.date),
      };
      return await Appointment.create(appointmentData);
    },
    updateAppointment: async (_: any, { input }: any) => {
      const { id, date, ...rest } = input;
      const updateData = {
        ...rest,
      };

      if (date) {
        updateData.date = new Date(date);
      }

      return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
    },
    deleteAppointment: async (_: any, { id }: any) => {
      await Appointment.findByIdAndDelete(id);
      return true;
    },
  },

  Appointment: {
    patient: async (appointment: any) => {
      return await Patient.findById(appointment.patientId);
    },
    date: (appointment: any) => {
      return new Date(appointment.date).toISOString(); // ✅ ensure ISO string
    },
  },
};
