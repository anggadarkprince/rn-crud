import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheet,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {TransparentButton} from '../Button';
import {Divider} from '../Utility';

const DismissBeforeAction = props => {
  const {close} = useBottomSheet();
  return <Pressable onPress={close}>{props.children}</Pressable>;
};

const ActionBottomSheet = ({actionRef, children, actionTitle, actionClose}) => {
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
          {children}
          {actionClose && (
            <>
              <Divider />
              <TransparentButton
                title={actionClose}
                onPress={() => bottomSheetRef.current.close()}
              />
            </>
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
    marginBottom: 20,
    alignContent: 'center',
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 3,
    color: '#cbcbcb',
  },
});

export {ActionBottomSheet};
