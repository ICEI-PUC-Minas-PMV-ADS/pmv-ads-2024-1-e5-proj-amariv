import { Coleta } from '../types/Coleta';
import { useApi } from '../hooks/useApi';

export const coletaService = {
    salvarColeta: async (col: Coleta) => {
        const jsonBody = JSON.stringify({ ...col, dataDeColeta: col.dataDeColeta?.toISOString() });
        const response = await useApi.post(`/SalvarColeta`, jsonBody);
        return response.data
    },

    updateColeta: async (col: Coleta) => {
        const jsonBody = JSON.stringify({ ...col, dataDeColeta: col.dataDeColeta?.toISOString() });
        const response = await useApi.post(`/UpdateColeta?id=${col.id}`, jsonBody);
        return response.data
    },

    getColeta: async (id: number) => {
        const response = await useApi.get(`/RecuperaColeta?id=${id}`);
        return response.data
    },

    getAllColetas: async () => {
        const response = await useApi.get("/RecuperaTodasColetas", {
            headers: {

                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    inserirColetaEmRoteiro: async (idColeta: string, idRoteiro: string) => {
        const response = await useApi.post(`InserirColetaEmRoteiro?idColeta=${idColeta}&idRoteiro=${idRoteiro}`);
        return response.data
    },

    DeleteColeta: async (id: string) => {

        const response = await useApi.post(`/DeletarColeta?id=${id}`);
        return response.data
    },

    VerificaDisponibilidadeColeta: async (data: Date) => {
        const jsonBody = JSON.stringify(data.toISOString());
        const response = await useApi.post(`/VerificaDisponibilidadeColeta`, jsonBody);
        return response.data
    }

}