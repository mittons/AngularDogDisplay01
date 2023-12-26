// This app uses thedogapi.com as a data source, but the http requests are routed through a backend to manage secrets.
// Its possible to replace this url with a direct reference to thedogapi.com but it requires user access to the api from the person
//   who is responsible for the requests.
export const environment = {
    production: true,
    apiUrl: 'https://nodedogroute-38a170d08520.herokuapp.com'
  };