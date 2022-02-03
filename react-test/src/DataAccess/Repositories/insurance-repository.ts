import { MainRepository } from './main-repository';
import { IInsurance } from '../Interfaces/IInsurance';

/**
 * Class used by the requester when need data from the repository
 * This class point to the 'insurances' end point
 * And a new instance of this class needs to be created before use it.
 */
export class InsuranceRepository extends MainRepository<IInsurance> {
	constructor() {
		super('insurances');
	}
}
