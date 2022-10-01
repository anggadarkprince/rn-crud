import {Alert} from 'react-native';

const confirm = ({
  title,
  message,
  addCloseAction,
  negativeAction,
  positiveAction,
}) => {
  Alert.alert(
    title,
    message,
    [
      ...(addCloseAction && [{text: 'Close', style: 'cancel'}]),
      {
        text: negativeAction.text,
        style: negativeAction.style || 'default',
        onPress: () => negativeAction.onPress(),
      },
      {
        text: positiveAction.text,
        style: positiveAction.style || 'default',
        onPress: () => positiveAction.onPress(),
      },
    ],
    {cancelable: true},
  );
};

export default {
  confirm,
};
