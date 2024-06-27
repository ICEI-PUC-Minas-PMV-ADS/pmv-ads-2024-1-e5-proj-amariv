import { Coleta } from '../types/Coleta';
import { useApi } from '../hooks/useApi';

export const coletaService = {
    salvarColeta: async (col: Coleta) => {
        const token = localStorage.getItem('authToken')
        const jsonBody = JSON.stringify({ ...col, dataDeColeta: col.dataDeColeta?.toISOString() });
        const response = await useApi.post(`/SalvarColeta`, jsonBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    updateColeta: async (col: Coleta) => {
        const token = localStorage.getItem('authToken')
        const jsonBody = JSON.stringify({ ...col, dataDeColeta: new Date(col.dataDeColeta!).toISOString() });
        const response = await useApi.post(`/UpdateColeta?id=${col.id}`, jsonBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    getColeta: async (id: number) => {
        const token = localStorage.getItem('authToken')
        const response = await useApi.get(`/RecuperaColeta?id=${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    getAllColetas: async () => {
        const token = localStorage.getItem('authToken')
        const response = await useApi.get("/RecuperaTodasColetas", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    inserirColetaEmRoteiro: async (idColeta: string, idRoteiro: string) => {
        const token = localStorage.getItem('authToken')
        const response = await useApi.post(`InserirColetaEmRoteiro?idColeta=${idColeta}&idRoteiro=${idRoteiro}`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    DeleteColeta: async (id: string) => {
        const token = localStorage.getItem('authToken')
        const response = await useApi.post(`/DeletarColeta?id=${id}`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    },

    VerificaDisponibilidadeColeta: async (data: Date) => {
        const token = localStorage.getItem('authToken')
        const jsonBody = JSON.stringify(data.toISOString());
        const response = await useApi.post(`/VerificaDisponibilidadeColeta`, jsonBody, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data
    }

}