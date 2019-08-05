1. firebase (auth/firestore/messaging/crashlytics/performance)
2. react-native-navigation: native navigation
3. login register
4. react-native-ui-lib: UI components with tabs
   https://github.com/react-native-community/react-native-blur
   \*\*\*5. test
5. ProGuard
6. codepush staging vs production
   https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli
   appcenter codepush deployment list -a app-name-android -k
   appcenter codepush release-react -a app-name-android --description 'Update to ver v0.1.2' => to Staging Android
   appcenter codepush promote -a app-name-android -s Staging -d Production => to Production Android
   appcenter codepush deployment history Staging -a app-name-android => show history
   appcenter codepush deployment list -a app-name-ios -k
   appcenter codepush release-react -a app-name-ios --description 'Update to ver v0.1.1' => to Staging iOS
   appcenter codepush promote -a app-name-ios -s Staging -d Production => to Production Android
   appcenter codepush deployment history Staging -a app-name-ios => show history
7. fastlane
   LC_ALL=en_US.UTF-8
   LANG=en_US.UTF-8
   android:
   SUPPLY_PACKAGE_NAME=you-android-app-id
   ios:
   MATCH_GIT_URL=your-match-git-url
   MATCH_APP_IDENTIFIER=your-ios-app-id
   MATCH_USERNAME=your-appstore-acc
   FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=your-appstore-app-password
   PILOT_USERNAME=your-appstore-acc
8. react-i18next - internationalization
9. build release (android/ios)
10. formik + yup: form validation
    https://gist.github.com/jaredpalmer/a8faaab12bc37e6a160a3c9549664f0b => async validation
11. react-native-fbsdk: login facebook
12. react-native-google-signin: login google
    keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android => debug SHA1 android
    keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64 => debug android
    keytool -exportcert -alias app -keystore android/app/app.keystore | openssl sha1 -binary | openssl base64
    https://facebook.github.io/react-native/docs/signed-apk-android
13. logging (checking render error as well - done)
14. react-native-root-toast
15. rematch
16. react-native-orientation-locker (fork from react-native-orientation)
    https://github.com/yamill/react-native-orientation/issues/136#issuecomment-358419659
17. react-native-vector-icons
18. react-native-splash-screen
    20: immer for state mutation
    \*\*\*21: check latest version (pending)
    https://github.com/kimxogus/react-native-version-check
    21: travis ci
    zip -r production.zip environments/production
    unzip production.zip
