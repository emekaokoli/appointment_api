import { type OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { error } from './error';

const v1Prefix = 'api';

export const spec: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'Doctors Scheduler API',
    version: 'v1',
    description: 'Doctors Schedulers',
  },
  servers: [
    {
      url: 'http://localhost:1487',
    },
  ],
  paths: {
    [`/${v1Prefix}/auth/register`]: {
      post: {
        tags: ['auth'],
        summary: 'Registers an account for a user',
        description: 'Registers an account for a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  date_of_birth: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
                required: ['email', 'password', 'date_of_birth'],
                additionalProperties: false,
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Returns the register user object',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/RegisterResponse',
                },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
          '4XX': error('Your problem'),
        },
      },
    },

    [`/${v1Prefix}/auth/login`]: {
      post: {
        tags: ['auth'],
        summary: 'Logs in a user',
        description: 'Login using email and password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
                required: ['email', 'password'],
                additionalProperties: false,
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Returns access token',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/LoginResponse',
                },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
        },
      },
    },
    [`/${v1Prefix}/providers`]: {
      get: {
        tags: ['providers'],
        summary: 'Get all providers',
        description: 'Get all providers',
        responses: {
          200: {
            description: 'Returns all providers',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/ProviderResponse',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['providers'],
        summary: 'Add new provider',
        description: 'Create new provider profile data',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  bio: {
                    type: 'string',
                  },
                  title: {
                    type: 'string',
                  },
                },
                required: ['name', 'bio', 'title'],
                additionalProperties: false,
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Returns provider',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/ProviderResponse',
                },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
          '4XX': error('Your problem'),
        },
      },
    },
    [`/${v1Prefix}/providers/{providerId}`]: {
      get: {
        tags: ['providers'],
        summary: 'Get provider by id',
        description: 'Get provider by id',
        parameters: [
          {
            name: 'providerId',
            in: 'path',
            description: 'Provider id',
            required: true,
            schema: { type: 'number' },
          },
        ],
        responses: {
          200: {
            description: 'Returns provider',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/ProviderResponse',
                },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
        },
      },
    },
    [`/${v1Prefix}/appointments`]: {
      get: {
        tags: ['appointments'],
        summary: 'Get all appointments',
        description: 'Get all appointment',

        responses: {
          200: {
            description: 'Returns appointment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/AppointmentResponse',
                },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
        },
      },

      post: {
        tags: ['appointments'],
        summary: 'Create appointment',
        description: 'Create appointment',
        requestBody: {
          description: 'Appointment data',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/Appointment',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Returns appointment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/AppointmentResponse',
                },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
        },
      },
    },
    [`/${v1Prefix}/appointments/{appointmentId}`]: {
      get: {
        tags: ['appointments'],
        summary: 'Get appointment by id',
        description: 'Get appointment by id',
        parameters: [
          {
            name: 'appointmentId',
            in: 'path',
            description: 'appointment id',
            required: true,
            schema: { type: 'number' },
          },
        ],
        responses: {
          200: {
            description: 'Returns appointment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/AppointmentResponse',
                },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
        },
      },
      put: {
        tags: ['appointments'],
        summary: 'Update appointment',
        description: 'Update appointment',
        parameters: [
          {
            name: 'appointmentId',
            in: 'path',
            required: true,
            description: 'Appointment ID',
            schema: { type: 'number' },
          },
        ],
        requestBody: {
          description: 'Appointment data',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/Appointment',
              },
            },
          },
        },
        security: [{ Authorization: [] }],
        responses: {
          200: {
            description: 'Returns appointment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/AppointmentResponse',
                },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
        },
      },
    },
    [`/${v1Prefix}/appointments/booked/{providerId}`]: {
      get: {
        tags: ['appointments'],
        summary: 'Get appointment booked by a user by id',
        description: 'Get appointment by id',
        parameters: [
          {
            name: 'providerId',
            in: 'path',
            description: 'appointment id',
            required: true,
            schema: { type: 'number' },
          },
        ],
        responses: {
          200: {
            description: 'Returns appointment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#components/schemas/AppointmentResponse',
                },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
        },
      },
    },
  },
  components: {
    securitySchemes: {
      Authorization: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    headers: {},
    schemas: {
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      Register: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          date_of_birth: {
            type: 'string',
            format: 'date-time',
          },
          password: {
            type: 'string',
          },
        },
        required: ['email', 'date_of_birth', 'password'],
      },
      RegisterResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  user_id: { type: 'number' },
                  date_of_birth: { type: 'string' },
                  created_at: { type: 'string' },
                },
                required: ['email', 'user_id', 'date_of_birth', 'created_at'],
              },
            },
            required: ['user'],
          },
        },
        required: ['data'],
      },
      Login: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              token: {
                type: 'object',
                properties: {
                  accessToken: { type: 'string' },
                },
                required: ['accessToken'],
              },
            },
            required: ['token'],
          },
        },
        required: ['data'],
      },
      Appointment: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            properties: {
              user_id: {
                type: 'number',
              },
              provider_id: {
                type: 'number',
              },
              start_time: {
                type: 'string',
              },
              end_time: {
                type: 'string',
              },
              reason_for_visit: {
                type: 'array',
                items: {
                  type: 'string',
                },
                default: ['General Checkup', 'Blood test'],
              },
              remark: { type: 'string', nullable: true },
            },
            required: [
              'user_id',
              'provider_id',
              'start_time',
              'end_time',
              'reason_for_visit',
            ],
          },
        },
        required: ['body'],
      },
      AppointmentResponse: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            properties: {
              user_id: { type: 'number' },
              provider_id: { type: 'number' },
              start_time: { type: 'string' },
              end_time: { type: 'string' },
              reason_for_visit: {
                type: 'array',
                items: { type: 'string' },
                default: ['General Checkup', 'Blood test'],
              },
              remark: { type: 'string', nullable: true },
            },
            required: [
              'user_id',
              'provider_id',
              'start_time',
              'end_time',
              'reason_for_visit',
            ],
          },
        },
        required: ['body'],
      },
      Provider: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              bio: { type: 'string' },
              title: { type: 'string' },
            },
            required: ['name', 'bio', 'title'],
          },
        },
        required: ['body'],
      },
      ProviderResponse: {
        type: 'object',
        properties: {
          provider_id: { type: 'number' },
          name: { type: 'string' },
          bio: { type: 'string' },
          title: { type: 'string' },
        },
        required: ['provider_id', 'name', 'bio', 'title'],
      },
      User: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          user_id: { type: 'number' },
          date_of_birth: { type: 'string' },
          created_at: { type: 'string' },
        },
        required: ['email', 'user_id', 'date_of_birth', 'created_at'],
      },
    },
  },
};
