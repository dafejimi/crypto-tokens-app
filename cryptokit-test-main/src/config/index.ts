// Setting up basic configurations.
import { COIN_API, API_KEY } from '@env';

type ApiClient = {
  base_url: string,
  api_key: string
}

class Configs {

  public static coinApiClient: ApiClient = {
    base_url: COIN_API,
    api_key: API_KEY,
  };
}


export default Configs;
