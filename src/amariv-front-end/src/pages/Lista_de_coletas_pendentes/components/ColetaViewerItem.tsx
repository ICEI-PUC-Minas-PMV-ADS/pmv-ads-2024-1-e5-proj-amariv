import { Button } from "../../../components/Button";
import { ReadColetaDto } from "../../../models/ColetaDtos/ReadColetaDto";
import { DateConvert } from "../../../utils/DateConvert";

/**
 * ColetaViewerItemProps
 */
export type ColetaViewerItemProps = {
  coleta: ReadColetaDto,
  onAprovarColeta: (coletaId: number) => void,
  onRecusarColeta: (coletaId: number) => void,
};

/**
 * ColetaViewerItem
 */

export const ColetaViewerItem = ({ coleta, onAprovarColeta, onRecusarColeta }: ColetaViewerItemProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[20rem] h-[16rem] bg-[#E8F4EB] border-[#bfcec3] border p-4 rounded">
        <div className="w-full h-full flex flex-col">
          <div className="flex flex-col flex-1">
            <div><strong>Cliente:</strong> {coleta.clienteNome}</div>
            <div><strong>Data:</strong> {DateConvert.getLocalDateTimeFormatted(coleta.dataDeColeta ?? "")}</div>
            <div><strong>Endereço:</strong> {coleta.endereco!.logradouro}, {coleta.endereco!.numero} - {coleta.endereco!.bairro}/{coleta.endereco!.cidade}</div>
            <div><strong>Materiais:</strong> {coleta.listaItensColeta}</div>
          </div>
          <div className="w-full flex flex-row items-center gap-x-2 px-4">
            <Button
              fontSize="medium"
              className="w-[8rem] bg-[#E36C6C] text-[#F4FAF6]"
              label="Recusar"
              onClick={() => onRecusarColeta(coleta.id!)} />
            <Button
              fontSize="medium"
              className="w-[8rem] rounded-lg text-[#F4FAF6]"
              color="secondary"
              label="Aceitar"
              onClick={() => onAprovarColeta(coleta.id!)} />
          </div>
        </div>
      </div>
    </div>
  );
};