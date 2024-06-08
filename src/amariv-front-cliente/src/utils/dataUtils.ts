
const dataUtils = {
  converterData: (dataString: string) => {
    const data = new Date(dataString)

    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    let day = data.getDate();

    let dataFormatada = (day.toString().length < 2 ? '0' + day : '' + day) + '/' + (month.toString().length < 2 ? '0' + month : '' + month) + '/' + year;

    return dataFormatada;
  },

  converterDataComHoras: (data: Date | null) => {
    if (data) {
      const horas = data.getHours().toString().padStart(2, '0');
      const minutos = data.getMinutes().toString().padStart(2, '0')
      return dataUtils.converterData(data.toString()) + ` ${horas}:${minutos}`;
    }
    else {
      return "--"
    }
  },

  dataFormatada: (data: Date | null) => {
    if (data) {
      return dataUtils.converterData(data.toString());
    }
    else {
      return "--"
    }
  }
}

export default dataUtils