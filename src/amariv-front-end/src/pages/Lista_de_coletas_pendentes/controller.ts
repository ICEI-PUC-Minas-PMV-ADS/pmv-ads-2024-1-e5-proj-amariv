import { PageBaseController } from "../../framework/controller";
import { useApi } from "../../hooks/useApi";
import { ListaDeColetasPendentesState, ListaDeColetasPendentesAction } from "./state";

/**
 * ListaDeColetasPendentesController
 */

export class ListaDeColetasPendentesController extends PageBaseController<ListaDeColetasPendentesState, ListaDeColetasPendentesAction> {
  async getAll(token: string) {
    try {
      const response = await useApi.get(`coletas`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      this.dispatch({ type: 'set_coletas', payload: await response.data });
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async aprovarColeta(token: string, coletaId: number) {
    try {
      const response = await useApi.get(`coletas/AprovarColeta?id=${coletaId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      this.dispatch({ type: 'set_coletas', payload: await response.data });
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async recusarColeta(token: string, coletaId: number) {
    try {
      const response = await useApi.get(`coletas/RecusarColeta?id=${coletaId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      this.dispatch({ type: 'set_coletas', payload: await response.data });
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  doReducer(prevState: ListaDeColetasPendentesState, action: ListaDeColetasPendentesAction): ListaDeColetasPendentesState {
    switch (action.type) {
      case 'set_coletas':
        return { ...prevState, coletas: action.payload };
    }
  }
}