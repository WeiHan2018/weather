// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

// add my WeatherBit API Key
export const weatherBit = {
  apiKey: 'ca5f4d6b9ab5406e919c55be89351ff3',
  urlBase: 'https://api.weatherbit.io/v2.0/forecast/daily'
};

