import axios from "axios";
import { Endereco } from "../types/Endereco";

type result = {
  lat: number
  lng: number
}

export const GoogleService = {
  key: "AIzaSyC9GTrFixFPXHb07ywHg6lyo9xMStU9a4M",
  buscarLatitudeLongitude: async (endereco: Endereco): Promise<result | "erro"> => {
    let searchString = (endereco.numero + endereco.logradouro + endereco.bairro + endereco.cidade).replaceAll(" ", "+")
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchString}&key=${GoogleService.key}`
    let result = await axios.get(url).then(r => {
      if (r.data.results) {
        return r.data.results[0].geometry.location
      }
      return "erro"
    }).catch(
      () => "erro"
    )
    return result
  }
}