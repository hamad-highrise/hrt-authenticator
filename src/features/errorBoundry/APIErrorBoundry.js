import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../alert';
import { errors } from '../../global';

import ErrorScreen from './ErrorScreen';
import { mainActions } from '../main/services';

function Boundry({ children, ...props }) {
    const { error } = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const onReset = () => {
        dispatch(alertActions.reset());
    };

    const renderErrorScreen = () => {
        console.warn(error.data);
        
        return <ErrorScreen reset={onReset} message={error.data.message} />;
    };
    return (
        <>
            {error.hasOccurred &&
            error.data.name !== errors.errorConstants.name.NETWORK ? (
                renderErrorScreen()
            ) : (
                <>{children}</>
            )}
        </>
    );
}

export default Boundry;
