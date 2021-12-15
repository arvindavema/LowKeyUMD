import { Alert } from 'react-native';
import Toast from 'react-native-root-toast';

export const LogError = (t, e)=>{console.log(t, e)};

export const LogInfo = (t) => {console.log(t)};

export const ToastMessage = (message) => {
    Toast.show(message, {duration: 500, position: Toast.positions.BOTTOM,color: "red", animation: true,  hideOnPress: true});
    LogInfo(message);
}

export const ErrorAlert = (title, message) => {
  Alert.alert(title, message)
  LogError(title, message)
};

export const UnverifiedAlert=()=>{
  ErrorAlert('Unverified!', 'Please verify your TERPmail address.')
  LogError('Unverified!', 'Please verify your TERPmail address.')
};

export const InfoAlert=(t,m)=>{
  Alert.alert(t,m)
  LogInfo(t,m)
};