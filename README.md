# My First Cross-Platform App with React Native

Welcome to the repository for my first ever cross-platform mobile application built with React Native! This project has been an exciting journey into mobile app development, using a range of technologies to create a seamless user experience on both iOS and Android devices.

## Features

- **Cross-Platform Compatibility:** Runs smoothly on both iOS and Android.
- **Persistent Login:** Remembers your login info even after closing and reopening the app, directly navigating you to the home page.
- **Smooth Animations:** Implemented engaging and fluid animations using React Native Animatable.
- **Media Handling:** Integrated Expo AV for seamless audio and video handling.
- **Stylish UI:** Leveraged NativeWind for a beautiful and responsive user interface.
- **Easy Navigation:** Used Expo Router for intuitive navigation across the app.

## Technology Stack

- **Frontend:** React Native (with Expo)
- **Backend:** Appwrite
- **UI Styling:** NativeWind
- **Media Handling:** Expo AV
- **Animations:** React Native Animatable
- **Navigation:** Expo Router
- **Additional Libraries:** Various React Native and Expo libraries for extended functionality.

## Installation

Follow these steps to set up the project on your local machine:

### Clone the Repository:
```bash
git clone https://github.com/DebugIt/Aora.git
cd aora
```

### Install Dependencies:
```bash
npm install
```

### Set Up Appwrite:
- Make sure you have [Appwrite](https://appwrite.io/) set up and running.
- Configure your Appwrite instance by updating the necessary details in the project configuration.

### Run the App:
```bash
expo start
```

## Usage

Once the project is set up, you can start the development server and run the app on your emulator or physical device:

### To run on an iOS device/emulator:
```bash
expo start --ios
```

### To run on an Android device/emulator:
```bash
expo start --android
```

## Project Structure

Here is a brief overview of the project's structure:

```plaintext
my-first-cross-platform-app/
├── assets/              # Asset files (images, videos, etc.)
├── components/          # Reusable components
├── screens/             # App screens
├── navigation/          # Navigation setup
├── services/            # API and backend services
├── utils/               # Utility functions
├── App.js               #
