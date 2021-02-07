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

const emptyStateRoot = {
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

const onBoardingRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: screensId.welcome
                    }
                }
            ]
        }
    }
};

const getMainRoot = () => mainRoot;
const getOnBoardingRoot = () => onBoardingRoot;
const getEmptyStateRoot = () => emptyStateRoot;

export { getOnBoardingRoot, getMainRoot, getEmptyStateRoot };
