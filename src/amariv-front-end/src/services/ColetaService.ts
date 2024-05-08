import axios from 'axios'
import { CreateColetaDto } from '../models/ColetaDtos/CreateColetaDto';
import { UpdateColetaDto } from '../models/ColetaDtos/UpdateColetaDto';

const useApi = axios.create({
    baseURL: "http://localhost:5100"
});

export const coletaService = {
   

    salvarColeta: async (coletaDto: CreateColetaDto) => {
        const jsonBody = JSON.stringify(coletaDto) 
        const response = await useApi.post(`/SalvarColeta`, jsonBody ,{
          headers: {
            "Content-type": "application/json; chatset=utf-8"
          }
        });
        return response.data
    },

    updateColeta: async (updateDto: UpdateColetaDto, id: string) => {
        const jsonBody = JSON.stringify(updateDto)
        const response = await useApi.post(`/UpdateColeta/${id}`,jsonBody,{
            headers :{
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    getColeta: async (id: string) => {

        const response = await useApi.get(`/RecuperaColeta/${id}`,{
            headers: {

                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    getAllColetas: async() => {
        const response = await useApi.get("/RecuperaTodasColetas",{
            headers :{

                "Content-type": "application/json; chatset=utf-8"
            }
        });
        response.data
    },

    inserirColetaEmRoteiro: async(idColeta: string, idRoteiro: string) => {

        const response = await useApi.post(`InserirColetaEmRoteiro?idColeta=${idColeta}&idRoteiro=${idRoteiro}`,{
            headers: {
                "Content-type": "application/json; chatset=utf-8" 
            },
       
        });
        return response.data
    },

    DeleteColeta: async (id: string) => {

        const response = await useApi.post(`/DeletarColeta/${id}`,{
            headers: {
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },


}