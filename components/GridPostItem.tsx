import React from 'react';
import { Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Post } from '@/constants/dummyData'; 

interface GridPostItemProps {
  post: Post;
  onPress: () => void;
}

const GridPostItem: React.FC<GridPostItemProps> = ({ post, onPress }) => {
  const { width } = useWindowDimensions();
  const itemSize = (width / 3) - 2;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { width: itemSize, height: itemSize }]}>
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0'
  },
});

export default GridPostItem;