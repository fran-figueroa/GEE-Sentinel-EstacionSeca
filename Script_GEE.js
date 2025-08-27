// 1. Definir la ROI
var roi = geometry;
Map.centerObject(roi, 12);

// 2. Definir las bandas útiles (sin QA ni máscaras MSK)
var selectedBands = ['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B10','B11','B12'];

// 3. Cargar manualmente la estación seca de cada año (mayo a octubre), filtrando por bandas

var col2017 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(roi)
  .filterDate('2017-05-01', '2017-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .select(selectedBands);

var col2018 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(roi)
  .filterDate('2018-05-01', '2018-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .select(selectedBands);

var col2019 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(roi)
  .filterDate('2019-05-01', '2019-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .select(selectedBands);

var col2020 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(roi)
  .filterDate('2020-05-01', '2020-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .select(selectedBands);

var col2021 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(roi)
  .filterDate('2021-05-01', '2021-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .select(selectedBands);

var col2022 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(roi)
  .filterDate('2022-05-01', '2022-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .select(selectedBands);

var col2023 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(roi)
  .filterDate('2023-05-01', '2023-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .select(selectedBands);

var col2024 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(roi)
  .filterDate('2024-05-01', '2024-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .select(selectedBands);

// 4. Unir todas las colecciones
var allDrySeasons = col2017
  .merge(col2018)
  .merge(col2019)
  .merge(col2020)
  .merge(col2021)
  .merge(col2022)
  .merge(col2023)
  .merge(col2024);

// 5. Calcular mediana multianual
var median = allDrySeasons.median().clip(roi);

// 5.5 Exportar bandas individuales

selectedBands.forEach(function(bandName) {
  Export.image.toDrive({
    image: median.select(bandName),
    description: 'S2_Mediana_' + bandName + '_2017_2024',
    folder: 'GEE_Exports',
    scale: 10,
    region: roi,
    maxPixels: 1e13
  });
});

