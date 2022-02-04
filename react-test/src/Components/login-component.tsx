import * as React from "react";
import { useState } from "react";
import { IUser } from "../DataAccess/Interfaces/IUser";
import { UserInsuranceRepository } from "../DataAccess/Repositories/user-insurance-repository";
import { UserRepository } from "../DataAccess/Repositories/user-repository";
import { LoginForm } from "./login-form";
import { InsuranceDetail } from "./insurance-detail";
import { InsuranceRepository } from "../DataAccess/Repositories/insurance-repository";
import { IInsurance } from "../DataAccess/Interfaces/IInsurance";

export const LoginComponent = () => {
    const [insurances, setInsurances] = useState<IInsurance[]>();
    const [name, setName] = useState<string>();
    const [showLogin, setShowLogin] = useState<boolean>(true);
    const [showError, setShowError] = useState<boolean>(false);

    /**
     * Method for fetching data from repository
     * It uses a paramater containing the user name provided by the user
     * It resturn type is void promise.
     * @param userName
     */
    const handleSubmit = async (userName: string): Promise<void> => {
        /**
         * New repository classes instances
         */
        const userRepository = new UserRepository();
        const userInsuranceRepository = new UserInsuranceRepository();
        const insuranceRepository = new InsuranceRepository();

        /**
         * Variables that will be used during the fetching process
         */
        let userId: number;
        let insuranceArray: IInsurance[] = [];
        let name: string;

        /**
         * query string to fetch a specific user by its login name
         */
        let query: string = `?login=${userName}`;

        /**
         * Call to the get method in MainRepository class and wait for a
         * response from API repository. Response type is an array of users.
         * It uses get() instad of findOne() because userName property is a string.
         */
        const user: IUser[] = await userRepository.get(query);

        if (user.length > 0) {
            userId = user[0].id;
            name = user[0].name;
            setName(name);
            setShowLogin(false);

            /**
             * Fetch all insurances connected to the users
             */

            const userInsurances = await userInsuranceRepository.get();

            /**
             * Fetch insurences
             * It return an array of insurances
             */
            const insurances: IInsurance[] = await insuranceRepository.get();

            /**
             *  If the "id" in the response match the userId a
             * search for his/hers insurance/s can be made
             */
            for (let x in userInsurances) {
                if (x === userId.toString()) {
                    insurances.forEach((insurance) => {
                        /**
                         * Filter the result to only the user's insureances
                         * and save them in an array
                         */
                        let ins = insurances.find((r) => r.id === insurance.id);
                        insuranceArray.push(ins);
                    });

                    /**
                     * and set them in state
                     */
                    setInsurances(insuranceArray);
                }
            }
        } else {
            /**
             * If the user doesn't exists show a error
             */
            setShowError(true);
        }
    };

    return (
        <>
            {/* Show the login component only if not users were found */}
            {showLogin && <LoginForm handleSubmit={handleSubmit} showError={showError} />}

            {/* 
                Show the insurance detail component only if there are insureances to show. 
                insurances and user's name are passed to the child component via props
            */}
            {insurances !== undefined && insurances.length > 0 && (
                <InsuranceDetail insurances={insurances} name={name} />
            )}
        </>
    );
};
