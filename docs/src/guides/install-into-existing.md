# Add Into Existing Project

If you don't have any code yet, please consider checking <a href="https://facebook.github.io/react-native/docs/getting-started" target="_blank">React Native Getting Started</a> documentation for help creating your app.

<hr>

### Installation

We recommend to develop React Native with expo-cli, you can install it with the following command.

```bash
npm i -g expo-cli
```

<hr>

### Create a New Project

A new project can be created using Angular CLI tools.

```bash
expo init PROJECT-NAME
```
<hr>

### Install React Native UI Kitten

```bash
npm i react-native-ui-kitten
```

<hr>

### Install Eva Design System and theme

```bash
npm i @eva-design/eva
```

That's it! React Native UI Kitten has to be ready to go now.

<hr>

### Configure Application Root

At this stage you have everything in place, let's configure React Native UI Kitten to be used in your app.

```tsx
import React from 'react';
import {
  mapping,
  theme,
} from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { Application } from './path-to/root.component';

export default class App extends React.Component {

   public render(): React.ReactNode {
     return (
       <ApplicationProvider
         mapping={mapping}
         theme={theme}>
         <Application/>
       </ApplicationProvider>
     );
   }
}
```

<hr>

### Configure Application Routing

We assume you have some navigation between screens in your application.
React Native UI Kitten has some components to support it.

Let's try configure basic routes with React Native UI Kitten TopNavigation component and <a href="https://reactnavigation.org/" target="_blank">React Navigation</a>.

```tsx
import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  NavigationContainer,
  HeaderProps,
} from 'react-navigation';
import { 
  TopNavigation,
  TopNavigationAction,
  TopNavigationProps,
  TopNavigationActionProps,
} from 'react-native-ui-kitten';
import { Screen1Container } from './path-to/screen-1.component';

const TopNavigationOptions = ({ navigation }) => {

  const onBackButtonPress = () => {
    navigation.goBack();
  };
  
  const renderBackButtonIcon = (): React.ReactElement<ImageProps> => (
    <Image source={require('./path-to/back-icon.png')} />
  );

  const renderBackButton = (): React.ReactElement<TopNavigationActionProps> => (
    <TopNavigationAction
      icon={renderBackButtonIcon()}
      onPress={onBackButtonPress}
    />
  );

  const header = (headerProps: HeaderProps): React.ReactElement<TopNavigationProps> => (
    <TopNavigation
      title='CURRENT-SCREEN-TITLE'
      leftControl={renderBackButton()}
    />
  );

  return { ...navigation, header };
};

const HomeNavigator: NavigationContainer = createStackNavigator(
  {
    Screen1: Screen1Container,
  }, {
    headerMode: 'none',
  },
);

const AppNavigator: NavigationContainer = createStackNavigator({
  ['Home']: {
    screen: HomeNavigator,
    navigationOptions: TopNavigationOptions,
  },
});

export const Application: NavigationContainer = createAppContainer(AppNavigator);

```

<hr>

## Related Articles
- [Top Navigation](components/top-navigation)
- [Bottom Navigation](components/bottom-navigation)
