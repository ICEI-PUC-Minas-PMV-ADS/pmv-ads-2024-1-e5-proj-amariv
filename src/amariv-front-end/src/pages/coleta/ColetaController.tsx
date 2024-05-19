
export const coletaController = {

    converteStringEmDate : (dataEntrada: string, hora: string) => {
        const dataFracionada = dataEntrada.split('/')
        const horaFracionada = hora.split(':')

        const ano  =  parseInt(dataFracionada[2])
        const mes  =  parseInt(dataFracionada[1]) -1
        const dia  =  parseInt(dataFracionada[0])

        const horas = parseInt(horaFracionada[0])
        const minutos = parseInt(horaFracionada[1])    

        var dataConvertida: Date = new Date(ano,mes,dia,horas,minutos)

        return dataConvertida;
    }
        
    

}


