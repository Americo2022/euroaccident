import * as React from "react";
import { useState } from "react";
import { ILoginFormProps } from "./Interfaces/ILoginForm";

export const LoginForm = (props: ILoginFormProps) => {
    const [userName, setUserName] = useState<string>();

    /**
     * Generic method to extract the string from the input element
     * and save it into the state
     * @param e event
     */
    const textFieldChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        setUserName(target.value);
    }

    /**
     * Use the handleSubmit props function to send 
     * the userName to the parent component
     * @param e event
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.handleSubmit(userName);
    }

    return (
        <div className="loginContainer">
            <h3>Logga in med ditt användarnamn</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input id="userName" type="text" placeholder="Ange ditt användarnamn" onChange={textFieldChange} />
                </div>
                <div>
                    <button type="submit">Logga in</button>
                </div>
                {/* Only shows if showError state is true */}
                {props.showError && (
                    <div>
                        <p>Användare finns inte</p>
                    </div>
                )}
            </form>
        </div>
    )
}