import axios from "axios";
import { Endereco } from "../types/Endereco";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useApi } from "../hooks/useApi";
import { initializeApp } from "firebase/app";

type result = {
  geometry: {
    location: {
      lat: number,
      lng: number
    },
    location_type: string
  }

}

const firebaseConfig = {
  apiKey: "AIzaSyC9GTrFixFPXHb07ywHg6lyo9xMStU9a4M",
  authDomain: "amariv-420723.firebaseapp.com",
  projectId: "amariv-420723",
  storageBucket: "amariv-420723.appspot.com",
  messagingSenderId: "1041782856986",
  appId: "1:1041782856986:web:7b258cc89be28d98d6a0a3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export const GoogleService = {
  key: "AIzaSyC9GTrFixFPXHb07ywHg6lyo9xMStU9a4M",
  buscarLatitudeLongitude: async (endereco: Endereco): Promise<result | "erro"> => {
    let searchString = (endereco.numero + endereco.logradouro + endereco.bairro + endereco.cidade).replaceAll(" ", "+")
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchString}&key=${GoogleService.key}`

    let result = await axios.get(url).then(r => {
      if (r.data.results.lenght > 0) {
        return r.data.results[0]
      }
      return "erro"
    }).catch(
      () => "erro"
    )
    return result
  },

  loginGoogle: async (token: string) => {
    const json = JSON.stringify({
      token: token
    })
    const response = await useApi.post("/googlelogin", json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  },

  googleRedirectLogin: async () => {
    let result = await signInWithPopup(auth, provider).then((result) => {
      const credentials = GoogleAuthProvider.credentialFromResult(result)
      if (credentials?.idToken)
        return credentials.idToken
      else return "error"
    }).catch(x => {
      return "error"
    })

    return result
  },

}