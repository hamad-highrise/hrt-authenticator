// import screensId from './screensId';
// import { Navigation } from 'react-native-navigation';

// const setInitialRoot = () => {
//     Navigation.setDefaultOptions({
//         animations: {
//             setRoot: {
//                 waitForRender: true
//             }
//         },
        
//         topBar: {
//             visible: false
//         }
//     });
//     Navigation.events().registerAppLaunchedListener(() => {
//         Navigation.setRoot({
//             root: {
//                 stack: {
//                     children: [
//                         {
//                             component: {
//                                 name: screensId.splash
//                             }
//                         }
//                     ]
//                 }
//             }
//         });
//     });
// };

// const setEmptyStateRoot = () => {
//     Navigation.setDefaultOptions({
//         animations: {
//             setRoot: {
//                 waitForRender: true
//             }
//         },
//         topBar: {
//             visible: false
//         }
//     });
//     Navigation.setRoot({
//         root: {
//             stack: {
//                 children: [
//                     {
//                         component: {
//                             name: screensId.emptyState
//                         }
//                     }
//                 ]
//             }
//         }
//     });
// };

// const setOnBoardingRoot = () => {
//     Navigation.setDefaultOptions({
//         animations: {
//             setRoot: {
//                 waitForRender: true
//             }
//         },
//         topBar: {
//             visible: false
//         }
//     });
//     Navigation.setRoot({
//         root: {
//             stack: {
//                 children: [
//                     {
//                         component: {
//                             name: screensId.welcome
//                         }
//                     }
//                 ]
//             }
//         }
//     });
// };

// const setMainRoot = () => {
//     Navigation.setDefaultOptions({
//         animations: {
//             setRoot: {
//                 waitForRender: true
//             }
//         },
//         topBar: {
//             visible: false
//         }
//     });
//     Navigation.setRoot({
//         root: {
//             stack: {
//                 children: [
//                     {
//                         component: {
//                             name: screensId.main
//                         }
//                     }
//                 ]
//             }
//         }
//     });
// };

// export { setInitialRoot, setEmptyStateRoot, setOnBoardingRoot, setMainRoot };
