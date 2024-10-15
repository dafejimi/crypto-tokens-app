import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  Button,
} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import TokenCard from './token-card';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONT } from '../constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { useFavorites } from '../hooks/FavoritesContext';

const GET_TOKENS = gql`
  query GetTokens($limit: Int!) {
    tokens(limit: $limit) {
      id
      name
      symbol
      price
    }
  }
`;

type TokensScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tokens'
>;

const Tokens: React.FC = () => {
  const navigation = useNavigation<TokensScreenNavigationProp>();
  const {favorites, setFavorites} = useFavorites();
  const { loading, error, data } = useQuery(GET_TOKENS, {
    variables: { limit: 20 },
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const navigateToSingleToken = (id: string) => {
    navigation.navigate('SingleToken', { tokenId: id });
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };


  const renderTokenCard = ({ item }: { item: { id: string; name: string; symbol: string; price: number } }) => (
    <TokenCard
      token={item}
      isFavorite={favorites.has(item.id)}
      onPressFavorite={toggleFavorite}
      onPressCard={() => navigateToSingleToken(item.id)}
    />
  );

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tokens</Text>
          <Text style={styles.headerSubtitle}>Listing and managing your favorite tokens</Text>
          <Button title="Go to Settings" onPress={navigateToSettings} />
        </View>
        <FlatList
          data={data.tokens}
          renderItem={renderTokenCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite, // Using consistent background color
  },
  header: {
    paddingVertical: SIZES.large,
    paddingHorizontal: SIZES.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2, // Matching subtle gray from the design system
  },
  headerTitle: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.bold,
    color: COLORS.primary, // Using primary color for the header title
  },
  headerSubtitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.gray, // Consistent use of muted gray for subtitles
    marginTop: SIZES.small,
  },
  listContainer: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large,
  },
  loadingText: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: SIZES.xxLarge,
  },
  errorText: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.tertiary, // Use the tertiary color for error messages
    textAlign: 'center',
    marginTop: SIZES.xxLarge,
  },
});

export default Tokens;
