import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

import { UserBookingsScreen } from './booking/screens';
import { UserHomePage, UserProfileScreen } from './user/screens';

export const AppStack = () => {
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: 'BOOKINGS', title: 'Reservas', icon: 'book' },
    { key: 'HOME', title: 'Home', icon: 'home' },
    { key: 'PROFILE', title: 'Perfil', icon: 'account-box' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    BOOKINGS: UserBookingsScreen,
    HOME: UserHomePage,
    PROFILE: UserProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ padding: 7, backgroundColor: '#0D8686' }}
    />
  );
};
