import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../alert';

import ErrorScreen from './ErrorScreen';

function Boundry({ children, ...props }) {
    const { error } = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const onReset = () => {
        dispatch(alertActions.reset());
    };

    const renderErrorScreen = () => {
        return <ErrorScreen reset={onReset} message={error.data.message} />;
    };
    return <>{!error.hasOccurred ? <>{children}</> : renderErrorScreen()}</>;
}

export default Boundry;
