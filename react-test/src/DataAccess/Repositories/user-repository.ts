import { MainRepository } from './main-repository';
import { IUser } from '../Interfaces/IUser';

/**
 * Class used by the requester when need data from the repository
 * This class point to the 'users' end point
 * And a new instance of this class needs to be created before use it.
 */
export class UserRepository extends MainRepository<IUser> {
	constructor() {
		super('users');
	}
}
