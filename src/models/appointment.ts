// models/Appointment.ts
import { Model } from 'objection';
import Doctor from './doctors';

class Appointment extends Model {
  static tableName = 'appointments';

  id!: number;
  doctorId!: number;
  patientId!: number; // You might want to add a patient model and reference it here
  dateTime!: Date;

  doctor!: Doctor;

  static get relationMappings() {
    return {
      doctor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Doctor,
        join: {
          from: 'appointments.doctorId',
          to: 'doctors.id',
        },
      },
    };
  }
}

export default Appointment;
