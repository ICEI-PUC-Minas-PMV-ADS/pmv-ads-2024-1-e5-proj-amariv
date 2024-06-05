import { Endereco } from "../types/Endereco";

export const GoogleService = {
  key: "AIzaSyC9GTrFixFPXHb07ywHg6lyo9xMStU9a4M",
  buscarLatitudeLongitude: (endereco: Endereco) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=210+Professor+Diaulas+Saudade+Itabirito&key=${key}`
  }
}