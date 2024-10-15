import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_TOKENS } from '../modules/coin_api';
import { COLORS, FONT, SIZES } from '../constants';
import { useFavorites } from '../hooks/FavoritesContext';

const Settings: React.FC = () => {
  // In a real app, you'd fetch this from a user management system
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150',
  };

  const { favorites } = useFavorites();
  const { loading, error, data } = useQuery(GET_TOKENS, {
    variables: { limit: 100 }, // Fetch a large number of tokens to ensure we have data for all favorites
  });

  const favoriteTokens = data?.tokens.filter((token: { id: string; }) => favorites.has(token.id)) || [];

  const renderFavoriteToken = ({ item }: { item: { id: string; name: string; symbol: string } }) => (
    <View style={styles.tokenItem}>
      <Text style={styles.tokenSymbol}>{item.symbol}</Text>
      <Text style={styles.tokenName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.favoritesSection}>
        <Text style={styles.sectionTitle}>Favorite Tokens</Text>
        {loading ? (
          <Text>Loading favorite tokens...</Text>
        ) : error ? (
          <Text>Error loading favorite tokens</Text>
        ) : (
          <FlatList
            data={favoriteTokens}
            renderItem={renderFavoriteToken}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  profileSection: {
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SIZES.small,
  },
  name: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
  },
  email: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  favoritesSection: {
    marginTop: SIZES.large,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    marginBottom: SIZES.small,
  },
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
  },
  tokenSymbol: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  tokenName: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});

export default Settings;
