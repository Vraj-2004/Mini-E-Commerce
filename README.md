# 📱 React Native E-Commerce App

A complete mini e-commerce mobile application built using **Expo**, **React Native**, **Expo Router**, **TypeScript**, **Context API**, and **AsyncStorage**.  
This app includes: **Product List → Details → Cart → Order History → Auth Modal**.

---

## 🚀 Features

### 🔐 Authentication
- Login handled through a **global modal** (no separate screen).
- Modal appears only when accessing protected screens.
- After login, back navigation **never shows login modal again**.
- Authentication state is stored using AsyncStorage.

### 🛒 Shopping Cart
- Add/remove items
- Prevent duplicate items
- Cart persists across app restarts
- Navigate automatically to cart after adding

### 📦 Orders & History
- Place order → moves items to order history
- Each order gets numbered: `Order #1`, `Order #2`, …
- Clicking an order shows detailed list: image, title, price
- Total cost displayed
- Order history stored in AsyncStorage

### 🧭 Navigation
Using **expo-router** with a Drawer:
- Product List  
- Cart  
- Order History  
- Profile  

---

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
