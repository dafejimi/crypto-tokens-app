import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { LineChart } from 'react-native-chart-kit';
import { COLORS, FONT, SIZES } from '../constants';
import { RootStackParamList } from "../../types/types";
import { RouteProp } from '@react-navigation/native';

type SingleTokenProps = {
  route: RouteProp<RootStackParamList, 'SingleToken'>;
};

const GET_TOKEN = gql`
  query GetToken($id: ID!) {
    token(id: $id) {
      id
      name
      symbol
      price
      market_cap
      percent_change_24h
    }
  }
`;

const SingleToken: React.FC<SingleTokenProps> = ({ route }) => {
  const { tokenId } = route.params;
  const { loading, error, data } = useQuery(GET_TOKEN, {
    variables: { id: tokenId },
  });

  if (loading) {return <Text>Loading...</Text>;}
  if (error) {return <Text>Error: {error.message}</Text>;}

  const token = data.token;

  // Dummy data for the chart
  const chartData = {
    labels: ['1D', '7D', '1M', '3M', '1Y'],
    datasets: [
      {
        data: [
          token.price * 0.95,
          token.price * 0.98,
          token.price * 1.02,
          token.price * 1.05,
          token.price,
        ],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{token.symbol}</Text>
        <Text style={styles.name}>{token.name}</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>${token.price.toFixed(2)}</Text>
        <Text style={[
          styles.change,
          { color: token.percent_change_24h >= 0 ? COLORS.tertiary : 'red' },
        ]}>
          {token.percent_change_24h.toFixed(2)}%
        </Text>
      </View>

      <LineChart
        data={chartData}
        width={350}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: COLORS.white,
          backgroundGradientFrom: COLORS.white,
          backgroundGradientTo: COLORS.white,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.infoContainer}>
        <InfoItem label="Market Cap" value={`$${token.market_cap.toLocaleString()}`} />
      </View>
    </ScrollView>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
  symbol: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
  },
  name: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    marginTop: 1,
  },
  price: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.bold,
  },
  change: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
  },
  chart: {
    marginVertical: SIZES.medium,
    borderRadius: 16,
  },
  infoContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    marginTop: SIZES.large,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.small,
  },
  infoLabel: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },
  infoValue: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
});

export default SingleToken;
