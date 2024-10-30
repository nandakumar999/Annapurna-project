import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import RegistrationForm from '../Registration';
import CheckoutProcess from '../CheckoutProcess';
 
const Checkout = () => {
    const { user } = useContext(AuthContext);
 
    return (
        <div>
            {user ? <CheckoutProcess /> : <RegistrationForm />}
        </div>
    );
};
 
export default Checkout;