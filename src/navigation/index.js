import { Navigation } from 'react-native-navigation';
import { getOnBoardingRoot, getMainRoot, getEmptyStateRoot } from './root';
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
        console.warn(error);
        alert(error.message);
    }
};

const goToRoot = (componentId) => {
    Navigation.popToRoot(componentId);
};

const setRoot = () => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: false
        }
    });
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                stack: {
                    children: [
                        {
                            component: {
                                name: screenIds.welcome
                            }
                        }
                    ]
                }
            }
        });
    });
};

const setMainRoot = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: screenIds.main
                        }
                    }
                ]
            }
        }
    });
};

const navigator = {
    goBack,
    goTo,
    goToRoot,
    registerScreens,
    screenIds,
    setMainRoot,
    setRoot
};

export default navigator;
