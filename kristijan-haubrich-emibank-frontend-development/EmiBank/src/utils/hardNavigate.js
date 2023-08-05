import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function hardNavigate(name, params) {
  navigationRef.current?.dispatch(
    StackActions.replace(name,params)
  )
}