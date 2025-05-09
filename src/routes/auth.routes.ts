import { Request, Response, Router } from 'express';
import { isEmpty, omit } from 'lodash';
import { validate } from '../middleware/validate';
import { LoginSchema, registerUser } from '../schema/response';
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

const router = Router();

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await validatePassword({ email, password });

    if (typeof user === 'string') {
      return ResponseBuilder.failure(res, 401, user);
    }

    const accessToken = signJwt(
      { user: omit(user, ['password']) },
      { expiresIn: '4h' } // 4 hours
    );

    return ResponseBuilder.success(res, 200, { accessToken });
  } catch (error: any) {
    return ResponseBuilder.failure(res, 500, error.message);
  }
}

async function allPatients(_: Request, res: Response): Promise<void> {
  try {
    const user = await getAll();
    const omitedUser = user.map((user) => omit(user, ['password']));
    return ResponseBuilder.success(res, 200, { results: omitedUser });
  } catch (error) {
    return ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

async function createHandler(req: Request, res: Response): Promise<void> {
  const { date_of_birth, email, password } = req.body;
  try {
    const checkIfExist = await getByEmail(email);
    if (!isEmpty(checkIfExist) && checkIfExist?.[0].email === email) {
      return ResponseBuilder.failure(
        res,
        400,
        "There's an account associated with this email"
      );
    }
    await create({ email, date_of_birth, password });

    return ResponseBuilder.success(res, 201, {
      message: 'Account created successfully',
    });
  } catch (error: any) {
    return ResponseBuilder.failure(res, 500, error?.message);
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

    return ResponseBuilder.success(res, 200, { results: omitedUser });
  } catch (error: any) {
    return ResponseBuilder.failure(res, 500, error.message);
  }
}

router.get('/', allPatients);
router.get('/:id', findById);
router.post('/login', validate(LoginSchema), loginHandler);
router.post('/register', validate(registerUser), createHandler);

export { router };

