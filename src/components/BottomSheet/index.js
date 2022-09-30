import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {Button} from '../Button';
import {Divider} from '../Utility';

const ActionBottomSheet = ({actionRef, actions, actionTitle, actionClose}) => {
  let currentAction = null;
  const bottomSheetRef = actionRef;

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      if (currentAction) {
        setTimeout(() => {
          currentAction();
          currentAction = null;
        }, 75);
      }
    }
  };

  const triggerAction = action => {
    const dismissOption = typeof action.closeOnPress !== 'undefined';
    const isDismissible = dismissOption ? action.closeOnPress : false;
    if (action.onPress) {
      if (!isDismissible) {
        action.onPress();
      } else {
        currentAction = action.onPress;
        bottomSheetRef.current.close();
      }
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      style={styles.bottomSheet}
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={renderBackdrop}>
      <BottomSheetView onLayout={handleContentLayout}>
        <View style={styles.actionContainer}>
          {actionTitle && <Text style={styles.actionTitle}>{actionTitle}</Text>}
          {actions.map((action, index) => {
            const visibleOption = typeof action.visible !== 'undefined';
            const isVisible = visibleOption ? action.visible : true;
            if (!isVisible) {
              return null;
            }

            return (
              <View key={action.action}>
                <Pressable
                  onPress={() => triggerAction(action)}
                  disabled={action.disabled || false}
                  style={({pressed}) => [
                    styles.actionButton,
                    pressed ? styles.actionButtonPressed : {},
                  ]}>
                  <Text style={[styles.actionText]}>{action.action}</Text>
                </Pressable>
                {index < actions.length - 1 && <Divider />}
              </View>
            );
          })}
          {actionClose && (
            <Button
              title={actionClose}
              onPress={() => bottomSheetRef.current.close()}
              buttonStyle={styles.closeButton}
              textStyle={styles.closeButtonText}
            />
          )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
  handle: {paddingTop: 20, paddingBottom: 10},
  handleIndicator: {backgroundColor: '#ccc'},
  actionContainer: {
    flex: 1,
    padding: 20,
    alignContent: 'center',
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 4,
    color: '#cbcbcb',
    textTransform: 'uppercase',
  },
  actionButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 5,
  },
  actionButtonPressed: {
    backgroundColor: '#e2e2e2',
  },
  actionText: {
    color: 'black',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export {ActionBottomSheet};
