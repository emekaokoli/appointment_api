import { Request, Response, Router } from 'express';
import { isEmpty } from 'lodash';
import { deserializeUser } from '../middleware/authenticate';
import requireUser from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { validateProviders } from '../schema/provider';
import { AllProviders, FindOne, create } from '../services/providers.service';
import { ResponseBuilder } from '../utils/responseBuilder';

const router = Router();

async function getProviders(_: Request, res: Response) {
  try {
    const providers = await AllProviders();

    ResponseBuilder.success(res, 200, { results: providers });
  } catch (error) {
    ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

async function createProvider(req: Request, res: Response) {
  const { name, bio, title } = req.body;
  try {
    await create({ name, bio, title });

    ResponseBuilder.success(res, 201, {
      message: 'Provider record created successfully',
    });
  } catch (error) {
    ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

async function findOneProvider(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const provider = await FindOne(id);

    if (isEmpty(provider)) {
      ResponseBuilder.failure(res, 404, 'Provider not found');
    }

    ResponseBuilder.success(res, 200, { results: provider });
  } catch (error) {
    ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

router.get('/:id', deserializeUser, requireUser, findOneProvider);
router.get('/', deserializeUser, requireUser, getProviders);
router.post(
  '/',
  deserializeUser,
  requireUser,
  validate(validateProviders),
  createProvider
);

export { router };

