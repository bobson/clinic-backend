import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPatient extends Document {
  name: string;
  email: string;
  phone: string;
}

const patientSchema = new Schema<IPatient>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export const Patient: Model<IPatient> =
  mongoose.models.Patient || mongoose.model<IPatient>("Patient", patientSchema);
