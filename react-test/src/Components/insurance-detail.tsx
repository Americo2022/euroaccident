import * as React from "react";
import { IInsuranceDetailProps } from "./Interfaces/IInsuranceDetail";

/**
 * Component that render the insurance information
 * Since it will be no changes to the information only props are used
 * In case that the information needs to be manipulated in some way
 * then with useEffect() can we get a fresh copy of the data in the state
 * @param props from parent component
 * @returns
 */
export const InsuranceDetail = (props: IInsuranceDetailProps) => {
    return (
        <div className='insurancesDetails'>
            <div className='header'>
                <h3>{props.name}</h3>
                <button onClick={() => window.location.reload()} className='button'>
                    Logga ut
                </button>
            </div>
            {/* map() is used to render the insureances information */}
            {props.insurances.map((insurance, i) => (
                <div className='card' key={insurance.id}>
                    <h3>{insurance.title}</h3>
                    <h4>{insurance.preamble}</h4>
                    <p>{insurance.body}</p>
                    <a href={insurance.url}>Läs mer</a>
                </div>
            ))}
        </div>
    );
};
