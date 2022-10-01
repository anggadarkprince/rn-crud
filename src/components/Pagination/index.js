import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from '../Button';

const Pagination = ({onNext, onPrev, page, totalPage, onPageChange, style}) => {
  const [currentPage, setCurrentPage] = useState({
    page: Number(page || 1),
    action: null,
  });

  useEffect(() => {
    if (onPageChange) {
      onPageChange({
        currentPage: currentPage.page,
        nextPage: currentPage.page < totalPage ? currentPage.page + 1 : null,
        prevPage: currentPage.page > 1 ? currentPage.page - 1 : null,
        canNext: currentPage.page < totalPage,
        canPrev: currentPage.page > 1,
        action: currentPage.action,
      });
    }

    if (currentPage.action === 'prev' && onPrev) {
      onPrev(currentPage);
    }

    if (currentPage.action === 'next' && onNext) {
      onNext(currentPage);
    }
  }, [currentPage, onNext, onPageChange, onPrev, totalPage]);

  return (
    <View style={[styles.container, style]}>
      <Button
        title="|<<"
        disabled={currentPage.page === 1}
        buttonStyle={styles.button}
        onPress={() => setCurrentPage({page: 1, action: 'first'})}
      />
      <Button
        title="Prev"
        disabled={currentPage.page === 1}
        buttonStyle={styles.button}
        onPress={() =>
          setCurrentPage({page: currentPage.page - 1, action: 'prev'})
        }
      />
      <Text style={styles.page}>{currentPage.page}</Text>
      <Button
        title="Next"
        disabled={currentPage.page === totalPage}
        buttonStyle={styles.button}
        onPress={() =>
          setCurrentPage({page: currentPage.page + 1, action: 'next'})
        }
      />
      <Button
        title=">>|"
        disabled={currentPage.page === totalPage}
        buttonStyle={styles.button}
        onPress={() => setCurrentPage({page: totalPage, action: 'last'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    padding: 15,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 3,
  },
});

export {Pagination};
