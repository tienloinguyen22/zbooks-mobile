# **react-native-starter-kit (ver 0.1.0)**

## **1. Why React Native Starter Kit?**
As I have worked on many React native projects for my company, I have struggles doing repetitive tasks for setting up the projects, integrating 3rd-party libraries (very time-consuming and sometimes very painful :( ) and deployment. So I made this starter kit to help myself, my teammates and you guys save our precious time to focus on the business and make best apps. 

What this starter kit provides:
  - Authentication (using Firebase) with Facebook, Google, email and phone no. 
  - Code-push integration for OTA update (production lifesaver).  
  - Rematch as the state manager - Redux best practices without the boilerplate
  - Well-defined structure for aim-to-scale app
  - And **more** described in below sections

## **2. Project structures**
| Structures    | Description 
| ------------- | ------------- 
| *android*                         | Android native project
| *app_configuration*               | storing app configuration, each sub-folder is a configuration set of each corresponding environment
| *___default*                       | sample of configuration files
| *______android*                     | configuration files of Android project
| *_________app.keystore*              | keystore used to build release apk/bundle
| *_________app-services.json*         | for Google authentication and Firebase services
| *_________app.properties*            | storing keystore credentials and Android configuration
| *______fastlane*                    | configuration files of fastlane
| *_________googlePlaySecretKey.json*  | Google credentials used for uploading apk/bundle to Playstore
| *______ios*                         | configuration files of Android project
| *_________GoogleService-Info.plist*  | for Google authentication and Firebase services
| *______job_config.json*             | configuration of Facebook app id, app application id & app display  name
| *______job_config.json*             | configuration of Facebook app id, app application id & app display  name
| *______override_config.json*        | configuration files of Android project
| *___production*                    | your configuration files for production environment
| *___staging*                    | your configuration files for staging environment

## **3. Preferences of 3rd-party libraries**
(TBA)

## Some issues & solutions when adding 3rd-party libraries:
https://stackoverflow.com/questions/41477241/react-native-xcode-upgrade-and-now-rctconvert-h-not-found/41488258#41488258