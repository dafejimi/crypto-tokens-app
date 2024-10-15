export type Network = 'ETHEREUM' | 'POLYGON' | 'BSC'

export type RootStackParamList = {
    Tokens: undefined;
    SingleToken: { tokenId: string };
    MainView: undefined;  // Add this line
    Settings: { favorites: Set<string> };
};
