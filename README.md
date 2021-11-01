# hrt-authenticator

## Description
HRT Auhtenticator is application for both **Android**, as well as, **iOS**.

## Pre-Requesites
- Nodejs >= 14
- Java >= 11

If on Mac developing for iOS, you also need `cocoapods`, which can be install by running
```bash
sudo gem install cocoapods
```

## To Run
First install dependencies. Run
```bash
npm install
```
in the root folder of project. Then, run
```bash
cd ios && pod install
```
### Android
To install and run emulator or physical device, run the metro bundler by running the following command in the root folder:
```bash
npm start
```
Followings are the commands to run for a specific flavor
#### FBG Verify
```bash
npm run fbg
```
#### BAFL Verify
```bash
npm run alfalah
```
#### HRT Verify
```bash
npm run android
```