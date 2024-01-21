import { Request, Response, Router } from 'express';
import { isEmpty, omit } from 'lodash';
import { config } from '../config/default';
import {
  create,
  getAll,
  getByEmail,
  getById,
  validatePassword,
} from '../services/auth.service';
import { DomainErrror } from '../utils/error';
import { signJwt } from '../utils/jwt.util';
import { ResponseBuilder } from '../utils/responseBuilder';

const { accessTokenTtl } = config;

const router = Router();

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await validatePassword({ email, password });

    const accessToken = signJwt(
      { user: omit(user, ['password']) },
      { expiresIn: accessTokenTtl } // 60 minutes
    );

    return ResponseBuilder.success(res, 200, { accessToken });
  } catch (error: any) {
    return ResponseBuilder.failure(res, 500, error.message);
  }
}

async function allPatients(req: Request, res: Response): Promise<void> {
  try {
    const user = await getAll();
    const omitedUser = user.map((user) => omit(user, ['password']));
    return ResponseBuilder.success(res, 200, { users: omitedUser });
  } catch (error) {
    return ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

async function createHandler(req: Request, res: Response): Promise<void> {
  const { date_of_birth, email, password } = req.body;
  try {
    const userExist = await getByEmail(email);
    if (!isEmpty(userExist)) {
      return ResponseBuilder.failure(
        res,
        400,
        "There's an account associated with this email"
      );
    }
    const user = await create({ email, date_of_birth, password });

    return ResponseBuilder.success(res, 201, {});
  } catch (error: any) {
    console.trace(error.message);

    return ResponseBuilder.failure(res, 400, error?.message);
  }
}

async function findById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const user = await getById(id);

    if (!user) {
      DomainErrror.notFound(['User not found']);
    }

    const omitedUser = user.map((user) => omit(user, ['password']));

    return ResponseBuilder.success(res, 200, { user: omitedUser });
  } catch (error: any) {
    return ResponseBuilder.failure(res, 500, error.message);
  }
}

router.get('/', allPatients);
router.get('/:id', findById);
router.post('/login', loginHandler);
router.post('/register', createHandler);

export { router };
