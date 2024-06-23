import { loader } from "../../AppMap";
import { PageBaseController } from "../../framework/controller";
import { useApi } from "../../hooks/useApi";
import { ReadColetaDto } from "../../models/ColetaDtos/ReadColetaDto";
import { FuncionarioDto } from "../../models/FuncionarioDtos/FuncionarioDto";
import { RoteiroDeColetaDto } from "../../models/RoteiroDeColetaDtos/RoteiroDeColetaDto";
import { GoogRoutesService } from "../../services/GoogRoutesService";
import { RoteiroDeColetaAction, RoteiroDeColetaState } from "./state";

/**
 * Global map data.
 */

const gMapData: {
  marks: any[],
  polyline: any[],
} = {
  marks: [],
  polyline: [],
};

/**
 * RoteiroDeColetaController
 */

export class RoteiroDeColetaController extends PageBaseController<RoteiroDeColetaState, RoteiroDeColetaAction> {
  async initialize(token: string) {
    try {
      await this.GetValidRoteiroDeColetas(token);
      await this.getFuncionarios(token);
      await this.getStartPosition(token);
    } catch (e) {
      alert(e);
    }
  }

  changeRoutes(newRoute: ReadColetaDto[]) {
    this.dispatch({ type: 'set_coletas_roteiro', payload: newRoute });
  }

  async cancelarColeta(
    token: string,
    startPosition: { lat: number, lon: number },
    roteiroDeColetaId: number,
    coletaId: number,
  ) {
    try {
      const roteiroDeColetaDateResponse = await useApi.get(`GetRoteiroDeColetaDate?roteiroDeColetaId=${roteiroDeColetaId}`);
      const roteiroDeColetaDate = await roteiroDeColetaDateResponse.data;
      const [y, m, d] = roteiroDeColetaDate.split('T')[0].split('-');
      const startDate = new Date(y, m - 1, d, 0, 0, 0).toISOString();
      const endDate = new Date(y, m - 1, d, 23, 59, 59).toISOString();

      const body = { coletaId, roteiroDeColetaId, startDate, endDate };
      const response = await useApi.post(`RoteiroCancelarColeta`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as {
        roteiroDeColeta: RoteiroDeColetaDto,
        coletasRoteiro: ReadColetaDto[],
        coletasAprovadas: ReadColetaDto[],
      };

      const sortedAndFilteredGatherings = data.coletasRoteiro.sort((a, b) => a.posicaoLista! - b.posicaoLista!);
      data.coletasRoteiro = sortedAndFilteredGatherings;

      await this.updateRouteData(
        roteiroDeColetaId,
        startPosition,
        data.coletasRoteiro,
        false,
        true,
      );

      this.dispatch({ type: 'set_coletas', payload: data });
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async removeRouteToRoteiroDeColeta(
    token: string,
    startPosition: { lat: number; lon: number; },
    roteiroDeColetaId: number,
    coletaId: number,
  ) {
    try {
      const roteiroDeColetaDateResponse = await useApi.get(`GetRoteiroDeColetaDate?roteiroDeColetaId=${roteiroDeColetaId}`);
      const roteiroDeColetaDate = await roteiroDeColetaDateResponse.data;
      const [y, m, d] = roteiroDeColetaDate.split('T')[0].split('-');
      const startDate = new Date(y, m - 1, d, 0, 0, 0).toISOString();
      const endDate = new Date(y, m - 1, d, 23, 59, 59).toISOString();

      const body = { roteiroDeColetaId, coletaId, startDate, endDate };
      const response = await useApi.post(`RemoveRouteToRoteiroDeColeta`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as {
        roteiroDeColeta: RoteiroDeColetaDto,
        coletasRoteiro: ReadColetaDto[],
        coletasAprovadas: ReadColetaDto[],
      };

      const sortedAndFilteredGatherings = data.coletasRoteiro.sort((a, b) => a.posicaoLista! - b.posicaoLista!);
      data.coletasRoteiro = sortedAndFilteredGatherings;

      await this.updateRouteData(
        roteiroDeColetaId,
        startPosition,
        data.coletasRoteiro,
        false,
        true,
      );

      this.dispatch({ type: 'set_coletas', payload: data });

      return data.coletasRoteiro;
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async addRouteToRoteiroDeColeta(
    token: string,
    startPosition: { lat: number, lon: number },
    roteiroDeColetaId: number,
    coletaId: number
  ) {
    try {
      const roteiroDeColetaDateResponse = await useApi.get(`GetRoteiroDeColetaDate?roteiroDeColetaId=${roteiroDeColetaId}`);
      const roteiroDeColetaDate = await roteiroDeColetaDateResponse.data;
      const [y, m, d] = roteiroDeColetaDate.split('T')[0].split('-');
      const startDate = new Date(y, m - 1, d, 0, 0, 0).toISOString();
      const endDate = new Date(y, m - 1, d, 23, 59, 59).toISOString();

      const body = { roteiroDeColetaId, coletaId, startDate, endDate };
      const response = await useApi.post(`AddRouteToRoteiroDeColeta`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as {
        roteiroDeColeta: RoteiroDeColetaDto,
        coletasRoteiro: ReadColetaDto[],
        coletasAprovadas: ReadColetaDto[]
      };

      const sortedAndFilteredGatherings = data.coletasRoteiro.sort((a, b) => a.posicaoLista! - b.posicaoLista!);
      data.coletasRoteiro = sortedAndFilteredGatherings;

      await this.updateRouteData(
        roteiroDeColetaId,
        startPosition,
        data.coletasRoteiro,
        false,
        true,
      );

      this.dispatch({ type: 'set_coletas', payload: data });

      return data.coletasRoteiro;
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async renderRoutes(
    map: google.maps.Map | null,
    startPosition: { lat: number, lon: number } | null,
    coletasRoteiro: ReadColetaDto[] | null,
    dadosDasRotas: any,
  ) {
    if (map) {
      const { AdvancedMarkerElement, PinElement } = await loader.importLibrary("marker");

      this.clearMap();

      if (startPosition) {
        const pinBackground = new PinElement({
          background: 'blue',
          glyphColor: 'white',
          glyph: 'A',
        });

        gMapData.marks.push(new AdvancedMarkerElement({
          map,
          position: { lat: startPosition.lat, lng: startPosition.lon },
          content: pinBackground.element,
        }));
      }

      if (coletasRoteiro && coletasRoteiro.length > 0) {
        for (let i = 0; i < coletasRoteiro.length; i++) {
          const coleta = coletasRoteiro[i];

          const pinBackground = new PinElement({
            glyphColor: 'white',
            glyph: coleta.posicaoLista!.toString(),
          });

          gMapData.marks.push(new AdvancedMarkerElement({
            map,
            position: { lat: coleta.lat!, lng: coleta.lon! },
            content: pinBackground.element,
          }));
        }
      }

      if (dadosDasRotas) {
        if (coletasRoteiro && coletasRoteiro.length > 0) {
          gMapData.polyline.push(new google.maps.Polyline({
            map,
            path: google.maps.geometry.encoding.decodePath(dadosDasRotas.routes[0].polyline.encodedPolyline),
            strokeColor: 'green',
          }));
        } else {
          new google.maps.Polyline({
            map,
            strokeColor: 'green',
          });
        }
      }
    }
  }

  async optimizeRoutes(
    token: string,
    startPosition: { lat: number; lon: number; },
    roteiroDeColetaId: number,
    coletasRoteiro: ReadColetaDto[],
  ) {
    try {
      const sortedRoute = coletasRoteiro.sort((a, b) => a.posicaoLista! - b.posicaoLista!);
      const response = await GoogRoutesService.computeRoutes({
        origin: startPosition,
        destination: startPosition,
        intermediates: sortedRoute.map((c) => ({ lat: c.lat!, lon: c.lon! })),
        optimizeRoutes: true,
      });

      const optimizedRoute: ReadColetaDto[] = [];
      const optimizedIntermediateWaypointIndex = response.routes[0].optimizedIntermediateWaypointIndex;
      for (let i of optimizedIntermediateWaypointIndex) {
        optimizedRoute.push(sortedRoute[i]);
      }

      this.dispatch({ type: 'set_routes_data', payload: response });

      await this.updateRoutes(
        token,
        startPosition,
        roteiroDeColetaId,
        optimizedRoute.map((g, i) => ({ id: g.id, posicaoLista: i })),
      );
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async updateRoutes(
    token: string,
    startPosition: { lat: number, lon: number },
    roteiroDeColetaId: number,
    routeIdMap: any[],
  ): Promise<ReadColetaDto[]> {
    try {
      const body = { id: roteiroDeColetaId, routeIdMap };
      const response = await useApi.post(`OrdenaRoteiroDeColeta`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as ReadColetaDto[];
      const sortedAndFilteredGatherings = data.sort((a, b) => a.posicaoLista! - b.posicaoLista!);

      await this.updateRouteData(
        roteiroDeColetaId,
        startPosition,
        sortedAndFilteredGatherings,
        false,
        true,
      );

      this.dispatch({ type: 'set_coletas_roteiro', payload: sortedAndFilteredGatherings });

      return data;
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async GetValidRoteiroDeColetas(token: string) {
    try {
      const response = await useApi.get(`GetValidRoteiroDeColetas`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as RoteiroDeColetaDto[];

      data.forEach((ro) => {
        const dtArr = ro.dataRoteiro!.split('T')[0].split('-');
        const year = dtArr[2];
        const month = dtArr[1];
        const day = dtArr[0]
        ro.label = `${ro.funcionario?.nome} (${year}/${month}/${day})`;
      });

      this.dispatch({ type: 'set_valid_roteiro_de_coletas', payload: data });
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async saveRoteiroDeColeta(
    token: string,
    startPosition: { lat: number, lon: number },
    roteiroDeColetaId: number,
    funcionarioId: string,
    maxNumColeta: string,
    dataRoteiro: string,
  ) {
    try {
      const [y, m, d] = dataRoteiro.split('-') as any;
      const startDate = new Date(y, m - 1, d, 0, 0, 0).toISOString();
      const endDate = new Date(y, m - 1, d, 23, 59, 59).toISOString();

      const body = { roteiroDeColetaId, funcionarioId, maxNumColeta, startDate, endDate };
      const response = await useApi.post(`SaveRoteiroDeColeta`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as {
        roteiroDeColeta: RoteiroDeColetaDto,
        coletasRoteiro: ReadColetaDto[],
        coletasAprovadas: ReadColetaDto[]
      };

      const sortedAndFilteredGatherings = data.coletasRoteiro.sort((a, b) => a.posicaoLista! - b.posicaoLista!);
      data.coletasRoteiro = sortedAndFilteredGatherings;

      await this.updateRouteData(
        roteiroDeColetaId,
        startPosition,
        data.coletasRoteiro,
        false,
        true,
      );

      this.dispatch({ type: 'set_coletas', payload: data });

      return data.coletasRoteiro;
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async createRoteiroDeColeta(
    token: string,
    startPosition: { lat: number, lon: number },
    funcionarioId: string,
    maxNumColeta: string,
    dataRoteiro: string,
  ) {
    try {
      const dtArr = dataRoteiro.split('-');
      const year = parseInt(dtArr[0]);
      const month = parseInt(dtArr[1]) - 1;
      const day = parseInt(dtArr[2]);
      const startDate = new Date(year, month, day, 0, 0, 0).toISOString();
      const endDate = new Date(year, month, day, 23, 59, 59).toISOString();
      const body = { funcionarioId, maxNumColeta, startDate, endDate };
      const response = await useApi.post(`CreateRoteiroDeColeta`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as {
        roteiroDeColeta: RoteiroDeColetaDto,
        coletasRoteiro: ReadColetaDto[],
        coletasAprovadas: ReadColetaDto[]
      };

      const sortedAndFilteredGatherings = data.coletasRoteiro.sort((a, b) => a.posicaoLista! - b.posicaoLista!);
      data.coletasRoteiro = sortedAndFilteredGatherings;

      await this.updateRouteData(
        data.roteiroDeColeta.id!,
        startPosition,
        data.coletasRoteiro,
        false,
        true,
      );

      this.dispatch({ type: 'set_coletas', payload: data });

      return data;
    } catch (e: any) {
      const { message } = e.response.data ?? { message: "Erro desconhecido!" };
      throw new Error(message);
    }
  }

  async getFuncionarios(token: string) {
    try {
      const response = await useApi.get(`GetFuncionarios`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as FuncionarioDto[];
      this.dispatch({ type: 'set_funcionarios', payload: data });
    } catch (e: any) {
      const { message } = e.response.data;
      throw new Error(message);
    }
  }

  async getStartPosition(token: string) {
    try {
      const response = await useApi.get(`GetStartPosition`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as { lat: 0, lon: 0 };
      this.dispatch({ type: 'set_start_position', payload: data });
    } catch (e: any) {
      const { message } = e.response.data;
      throw new Error(message);
    }
  }

  async getColetasByDate(
    token: string,
    startPosition: { lat: number, lon: number },
    roteiroDeColetaId: number,
  ): Promise<void> {
    try {
      const roteiroDeColetaDateResponse = await useApi.get(`GetRoteiroDeColetaDate?roteiroDeColetaId=${roteiroDeColetaId}`);
      const roteiroDeColetaDate = await roteiroDeColetaDateResponse.data;
      const [y, m, d] = roteiroDeColetaDate.split('T')[0].split('-');
      const startDate = new Date(y, m - 1, d, 0, 0, 0).toISOString();
      const endDate = new Date(y, m - 1, d, 23, 59, 59).toISOString();

      const body = { roteiroDeColetaId, startDate, endDate };
      const response = await useApi.post(`GetColetasByDate`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data as {
        roteiroDeColeta: RoteiroDeColetaDto,
        coletasRoteiro: ReadColetaDto[],
        coletasAprovadas: ReadColetaDto[]
      };

      const sortedAndFilteredGatherings = data.coletasRoteiro.sort((a, b) => a.posicaoLista! - b.posicaoLista!);
      data.coletasRoteiro = sortedAndFilteredGatherings;

      await this.updateRouteData(
        roteiroDeColetaId,
        startPosition,
        data.coletasRoteiro,
        false,
        false,
      );

      this.dispatch({ type: 'set_coletas', payload: data });
    } catch (e: any) {
      const { message } = e.response.data;
      throw new Error(message);
    }
  }

  clearData() {
    const clearState = { roteiroDeColeta: null, coletasRoteiro: [], coletasAprovadas: [] };

    this.clearMap();

    this.dispatch({ type: 'set_routes_data', payload: null });
    this.dispatch({ type: 'set_coletas', payload: clearState });
  }

  private clearMap() {
    gMapData.polyline.forEach((p) => p.setMap(null));
    gMapData.marks.forEach((m) => m.setMap(null));

    gMapData.polyline = [];
    gMapData.marks = [];
  }

  private async updateRouteData(
    roteiroDeColetaId: number,
    startPosition: { lat: number, lon: number },
    coletasRoteiro: ReadColetaDto[],
    optimizeRoutes: boolean,
    resetRoute: boolean,
  ) {
    const routesDataStr = window.localStorage.getItem('routes_data');
    if (routesDataStr) {
      const routesData = JSON.parse(routesDataStr);
      if (routesData[roteiroDeColetaId]) {
        if (resetRoute) {
          const response = await GoogRoutesService.computeRoutes({
            origin: startPosition,
            destination: startPosition,
            intermediates: coletasRoteiro.map((c) => ({ lat: c.lat!, lon: c.lon! })),
            optimizeRoutes,
          });

          routesData[roteiroDeColetaId] = response;
          window.localStorage.setItem('routes_data', JSON.stringify(routesData));
          this.dispatch({ type: 'set_routes_data', payload: response });
        } else {
          this.dispatch({ type: 'set_routes_data', payload: routesData[roteiroDeColetaId] });
        }
      } else {
        const response = await GoogRoutesService.computeRoutes({
          origin: startPosition,
          destination: startPosition,
          intermediates: coletasRoteiro.map((c) => ({ lat: c.lat!, lon: c.lon! })),
          optimizeRoutes,
        });

        routesData[roteiroDeColetaId] = response;
        window.localStorage.setItem('routes_data', JSON.stringify(routesData));
        this.dispatch({ type: 'set_routes_data', payload: response });
      }
    } else {
      const routesData: any = {};

      const response = await GoogRoutesService.computeRoutes({
        origin: startPosition,
        destination: startPosition,
        intermediates: coletasRoteiro.map((c) => ({ lat: c.lat!, lon: c.lon! })),
        optimizeRoutes,
      });

      routesData[roteiroDeColetaId] = response;
      window.localStorage.setItem('routes_data', JSON.stringify(routesData));
      this.dispatch({ type: 'set_routes_data', payload: response });
    }
  }

  doReducer(prevState: RoteiroDeColetaState, action: RoteiroDeColetaAction): RoteiroDeColetaState {
    switch (action.type) {
      case 'set_coletas':
        return { ...prevState, ...action.payload };
      case 'set_coletas_roteiro':
        return { ...prevState, coletasRoteiro: action.payload };
      case 'set_coletas_aprovadas':
        return { ...prevState, coletasAprovadas: action.payload };
      case 'set_start_position':
        return { ...prevState, startPosition: action.payload };
      case 'set_funcionarios':
        return { ...prevState, funcionarios: action.payload };
      case 'set_roteiro_de_coleta':
        return { ...prevState, roteiroDeColeta: action.payload };
      case 'set_valid_roteiro_de_coletas':
        return { ...prevState, availableRoteiroDeColetas: action.payload };
      case 'set_routes_data':
        return { ...prevState, dadosDasRotas: action.payload };
    }
  }
}