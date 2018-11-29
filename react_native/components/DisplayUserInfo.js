import React from 'react';


/**
 * Displays to the user 
 */
const DisplayUserInfo = ({user_info}) => (
  <View>
    <Text>{user_info.address}</Text>
  </View>
);

export default DisplayUserInfo;
