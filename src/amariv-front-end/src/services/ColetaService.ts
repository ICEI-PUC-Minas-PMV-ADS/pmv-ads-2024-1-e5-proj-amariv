import axios from 'axios'
import { Coleta } from '../types/Coleta';


const useApi = axios.create({
    baseURL: "http://localhost:5100"
});

export const coletaService = {
   
    salvarColeta: async (coletaDto: Coleta) => {
        const jsonBody = JSON.stringify(coletaDto) 
        const response = await useApi.post(`/SalvarColeta`, jsonBody ,{
          headers: {
            "Content-type": "application/json; chatset=utf-8"
          }
        });
        return response.data
    },

    updateColeta: async (col: Coleta) => {
        const jsonBody = JSON.stringify(col)
        const response = await useApi.post(`/UpdateColeta?id=${col.id}`,jsonBody,{
            headers :{
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    getColeta: async (id: number) => {       
        const response = await useApi.get(`/RecuperaColeta?id=${id}`,{
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
       return response.data
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

        const response = await useApi.post(`/DeletarColeta?id=${id}`,{
            headers: {
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    VerificaDisponibilidadeColeta : async (data : Date) => {
        const jsonBody = JSON.stringify(data);
        const response = await useApi.post(`/VerificaDisponibilidadeColeta`, jsonBody,{
            headers :{
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    }

}