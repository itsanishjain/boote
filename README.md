## Build locally

https://docs.expo.dev/get-started/set-up-your-environment/
npx expo run:android

`build for emulator`
https://docs.expo.dev/develop/development-builds/create-a-build/

`development build need to connect with local server to run`

- eas build --profile development --platform android

`preview build don't need to connect with local server to run aka run it but just installing it`

- eas build -p android --profile preview

## Local build | `This is working with linux and mac only`

https://docs.expo.dev/build-reference/local-builds/

eas build --platform android --local
eas build --platform ios --local
eas build --platform android --local --profile development
eas build --platform android --local --profile preview_aab

## File size

https://github.com/expo/fyi/blob/main/android-app-size.md

## How to build app for devices

https://docs.expo.dev/develop/development-builds/create-a-build/

## how to test builds on IOS

https://docs.expo.dev/build/internal-distribution/

## how to install the specific version of builds

- eas build:run -p android
- https://docs.expo.dev/build-reference/apk/

## Expo code

Once you've added the Expo code, you must prebuild your app before running it.

`npx expo prebuild --platform android  --clean`
`adb uninstall com.anishjain.boote`

## Payments docs

https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet&lang=node

## Ideas

- showing only 4 analyis for free and then 8 more for paid version
- showing ranking you are in top 10 percentilse of our app user if you wanna be in top 1% subscribe to our app and learn more about skin care and how you can be more attractive

# Sounds

Gold coin prize
Achievement completed

source: https://mixkit.co/free-sound-effects
