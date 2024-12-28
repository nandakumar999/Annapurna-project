import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import SignUp from '../SignUp';
import CheckoutProcess from '../CheckoutProcess';
 
const Checkout = () => {
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
        document.title = "Checkout - Annapurna Farms";
     }, []);

    return (
        <div>
            {user ? <CheckoutProcess /> : <SignUp />}
        </div>
    );
};
 
export default Checkout;