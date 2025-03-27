import { createDocument } from 'zod-openapi';
import { version } from '../../package.json';
import { appointmentSchema } from './appointment';
import { error, errorResponseSchema } from './error';
import { validateProviders } from './provider';
import {
  LoginSchema,
  Omiteduser,
  RegisterResponseSchema,
  appointmentResponseSchema,
  loginResponseSchema,
  providerResponse,
  registerUser,
} from './response';

const v1Prefix = 'api';

export const spec = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'Doctors Scheduler API Documentation',
    version,
    description: 'Doctors Schedulers',
  },
  servers: [
    {
      url: 'http://localhost:1487',
      description: 'Development Endpoint',
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
              schema: registerUser,
            },
          },
        },
        responses: {
          201: {
            description: 'Returns the register user object',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RegisterResponse' },
              },
            },
          },
          400: error('Bad Request'),
          500: error('Internal Server Error'),
          // '4XX': error('Your problem'),
          401: error('Unauthorized'),
          403: error('Forbidden'),
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
              schema: { $ref: '#components/schemas/LoginUser' },
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
          401: error('Unauthorized'),
          403: error('Forbidden'),
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
          // '4XX': error('Your problem'),
          401: error('Unauthorized'),
          403: error('Forbidden'),
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
            schema: {
              type: 'number',
            },
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
      Error: errorResponseSchema,
      Register: registerUser,
      RegisterResponse: RegisterResponseSchema,
      LoginUser: LoginSchema,
      LoginResponse: loginResponseSchema,
      Appointment: appointmentSchema,
      AppointmentResponse: appointmentResponseSchema,
      Provider: validateProviders,
      ProviderResponse: providerResponse,
      User: Omiteduser,
    },
  },
});
