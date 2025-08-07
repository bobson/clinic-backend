"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.typeDefs = (0, graphql_tag_1.gql) `
  type Patient {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }

  type Appointment {
    id: ID!
    patientId: ID!
    patient: Patient
    date: String!
    reason: String!
  }

  type Query {
    patients: [Patient!]!
    patient(id: ID!): Patient
  }

  extend type Query {
    appointments: [Appointment!]!
  }

  input AddAppointmentInput {
    patientId: ID!
    date: String!
    reason: String!
  }

  input UpdateAppointmentInput {
    id: ID!
    date: String
    reason: String
  }

  type Mutation {
    addPatient(name: String!, email: String!, phone: String!): Patient!
    updatePatient(id: ID!, name: String, email: String, phone: String): Patient!
    deletePatient(id: ID!): Boolean!
  }

  extend type Mutation {
    addAppointment(input: AddAppointmentInput!): Appointment!
    updateAppointment(input: UpdateAppointmentInput!): Appointment!
    deleteAppointment(id: ID!): Boolean!
  }
`;
