// NetworkService.js
import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnection = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected;
};

export const subscribeToNetworkChanges = callback => {
  return NetInfo.addEventListener(callback);
};