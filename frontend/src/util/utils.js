
export const calculateWeightChange = (weightData) => {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const { startData, endData } = weightData;

  const [startDay, startMonth, startYear] = startData.data_pesagem.split('/');
  const startTime = new Date(startYear, startMonth - 1, startDay);
  const [endDay, endMonth, endYear] = endData.data_pesagem.split('/');
  const endTime = new Date(endYear, endMonth - 1, endDay);
  if (startTime.getTime() === endTime.getTime()) {
    return { erro: 'Selecione datas diferentes para etapa inicial e etapa final.' };
  }
  else if (startTime > endTime) {
    return { erro: 'A data da etapa final deve após a data da etapa inicial.' };
  }

  const daysPassed = Math.round((endTime - startTime) / MILLISECONDS_PER_DAY);
  const startWeight = parseFloat(weightData.startData.peso);
  const endWeight = parseFloat(weightData.endData.peso);
  const gpd = (endWeight - startWeight) / daysPassed;
  return {
    'pesoInicial': startWeight,
    'pesoFinal': endWeight,
    'diasPassados': daysPassed,
    'GPD': gpd.toFixed(3)
  };
}
