import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SHADOWS } from '../constants';
import AnimatedListItem from '../components/animated-list-item';

type TokenCardProps = {
  token: {
    id: string;
    name: string;
    symbol: string;
    price: number;
  };
  isFavorite: boolean;
  onPressFavorite: (id: string) => void;
  onPressCard: (id: string) => void;
};

const TokenCard: React.FC<TokenCardProps> = ({
  token,
  isFavorite,
  onPressFavorite,
  onPressCard,
}) => {
  return (
    <AnimatedListItem>
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPressCard(token.id)}
      >
        {/* Token Logo Section */}
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg', // Placeholder for token logo
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>

        {/* Token Info Section */}
        <View style={styles.textContainer}>
          <Text style={styles.symbolText}>{token.symbol}</Text>
          <Text style={styles.nameText}>{token.name}</Text>
        </View>

        {/* Price and Favorite Section */}
        <View style={styles.priceInfo}>
          <Text style={styles.priceText}>${token.price.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => onPressFavorite(token.id)}>
            <Ionicons
              name={isFavorite ? 'star' : 'star-outline'}
              size={24}
              color={isFavorite ? 'gold' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </AnimatedListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    ...SHADOWS.medium, // Reusing shadows from NearbyJobCard styles
    shadowColor: '#000',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25, // Circular shape
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '70%',
    height: '70%',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  symbolText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  nameText: {
    fontSize: 14,
    color: '#666',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
});

export default TokenCard;
