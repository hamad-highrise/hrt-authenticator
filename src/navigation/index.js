import { Navigation } from 'react-native-navigation';
import {
    setMainRoot,
    setOnBoardingRoot,
    setEmptyStateRoot,
    setInitialRoot
} from './root';
import registerScreens from './registerScreens';
import screenIds from './screensId';

const goBack = (componentId) => {
    Navigation.pop(componentId);
};

const goTo = (componentId, destinationName, props = {}) => {
    if (Object.values(screenIds).includes(destinationName))
        Navigation.push(componentId, {
            component: {
                name: destinationName,
                passProps: props
            }
        });
    else {
        const error = new Error('Destination Name is not correct');
        alert(error.message);
    }
};

const goToRoot = (componentId) => {
    Navigation.popToRoot(componentId);
};

const navigator = {
    goBack,
    goTo,
    goToRoot,
    registerScreens,
    screenIds,
    setMainRoot,
    setInitialRoot,
    setEmptyStateRoot,
    setOnBoardingRoot
};

export default navigator;
