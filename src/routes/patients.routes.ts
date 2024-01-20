import { Request, Response, Router } from 'express';
import { isEmpty, omit } from 'lodash';
import { validate } from '../middleware/validate';
import { createUser } from '../schema/user';
import {
  create,
  getAll,
  getByEmail,
  getById,
} from '../services/patients.service';
import { DomainErrror } from '../utils/error';
import { ResponseBuilder } from '../utils/responseBuilder';

const router = Router();

async function allPatients(req: Request, res: Response): Promise<void> {
  try {
    const user = await getAll();
    const omitedUser = user.map((user) => omit(user, ['password']));
    ResponseBuilder.success(res, 200, { users: omitedUser });
  } catch (error) {
    ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

async function createNewUser(req: Request, res: Response): Promise<void> {
  const { date_of_birth, email, password } = req.body;
  try {
    const userExist = await getByEmail(email);
    if (!isEmpty(userExist) && userExist[0].email === req.body.email) {
      DomainErrror.unprocessableEntity([
        "There's an account associated with this email",
      ]);
    }
    const user = await create({ email, date_of_birth, password });

    return ResponseBuilder.success(res, 201, {});
  } catch (error: any) {
    console.trace(error.message);

    ResponseBuilder.failure(res, 400, error?.message);
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

// eslint-disable-next-line
router.get('/:id', findById);
// eslint-disable-next-line
router.get('/', allPatients);
// eslint-disable-next-line
router.post('/', validate(createUser), createNewUser);

export { router };
