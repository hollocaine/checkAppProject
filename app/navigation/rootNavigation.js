import React from 'react';

export const navigationRef = React.createRef();

const navigate = (name, params) =>
  navigationRef.current?.navigate(name, params);
//Shorthand instead of using an if statement. This is if the navigation object is not null the navigate method is going to get called otherwise nothing will happen. current?. is using a null coalescing operator.

export default { navigate };
