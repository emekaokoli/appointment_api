// models/Doctor.ts
import { Model } from 'objection';
import Appointment from './appointment';

class Doctor extends Model {
  static tableName = 'doctors';

  id!: number;
  name!: string;
  bio!: string;
  title!: string;

  static get relationMappings() {
    return {
      appointments: {
        relation: Model.HasManyRelation,
        modelClass: Appointment,
        join: {
          from: 'doctors.id',
          to: 'appointments.doctorId',
        },
      },
    };
  }
}

export default Doctor;
