// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  urlAPi: 'http://192.168.0.3:8000/api/',
  firebaseConfig: {
    apiKey: "AIzaSyBTbGsnNwhzP-_jC0ozSdTC1WpsOMmGKNI",
    authDomain: "restaurantetato-7257a.firebaseapp.com",
    databaseURL: "https://restaurantetato-7257a.firebaseio.com",
    projectId: "restaurantetato-7257a",
    storageBucket: "restaurantetato-7257a.appspot.com",
    messagingSenderId: "942286705366",
    appId: "1:942286705366:web:bbeac753b7c7d0a644ef77",
    measurementId: "G-Q2SF51CDGF"
  }
};
