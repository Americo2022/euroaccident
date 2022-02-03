import { IUserInsurance } from '../Interfaces/IUserInsurance';
import { MainRepository } from './main-repository';

/**
 * Class used by the requester when need data from the repository
 * This class point to the 'user_insurances' end point
 * And a new instance of this class needs to be created before use it.
 */
export class UserInsuranceRepository extends MainRepository<IUserInsurance> {
	constructor() {
		super('user_insurances');
	}
}
