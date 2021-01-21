import screensId from './screensId';

const mainRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: screensId.main
                    }
                }
            ]
        }
    }
};

const onBoardingRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: screensId.emptyState
                    }
                }
            ]
        }
    }
};

const getMainRoot = () => mainRoot;
const getOnBoardingRoot = () => onBoardingRoot;

export { getOnBoardingRoot, getMainRoot };
