import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { View } from 'react-native';

type TabBarIconProps = IconProps<ComponentProps<typeof Ionicons>['name']>;

export function TabBarIcon({ style, ...rest }: TabBarIconProps) {
  return (
    <Ionicons size={24} style={[{ marginBottom: -3 }, style]} {...rest} />
  );
}