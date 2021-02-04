import { Navigation } from 'react-native-navigation';
import { getOnBoardingRoot, getMainRoot } from './root';
import registerScreens from './registerScreens';
import screenIds from './screensId';

const goBack = (componentId) => {
    Navigation.pop(componentId);
};

const goTo = (componentId, destinationName) => {
    if (Object.values(screenIds).includes(destinationName))
        Navigation.push(componentId, {
            component: {
                name: destinationName
            }
        });
    else {
        const error = new Error('Destination Name is not correct');
        console.warn(error);
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
    getOnBoardingRoot,
    getMainRoot
};

export default navigator;
