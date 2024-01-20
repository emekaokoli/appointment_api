import { Request, Response, Router } from 'express';
import { isEmpty } from 'lodash';
import { AllProviders, FindOne, create } from '../services/providers.service';
import { ResponseBuilder } from '../utils/responseBuilder';

const router = Router();

async function getProviders(req: Request, res: Response) {
  try {
    const providers = await AllProviders();

    ResponseBuilder.success(res, 200, { providers });
  } catch (error) {
    ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

async function createProvider(req: Request, res: Response) {
  const { name, bio, title } = req.body;
  try {
    const provider = await create({ name, bio, title });

    ResponseBuilder.success(res, 201, { provider });
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

    ResponseBuilder.success(res, 200, { provider });
  } catch (error) {
    ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

router.get('/:id', findOneProvider);
router.get('/', getProviders);
router.post('/', createProvider);

export { router };