/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from 'react'; 
import TileLayer from "ol/layer/Tile";
import Zoomify from "ol/source/Zoomify";
import { WKT } from "ol/format";
import VectorSource from "ol/source/Vector";
import { Map, View } from "ol"
import VectorLayer from "ol/layer/Vector";
import { Style, Fill, Stroke }from "ol/style";

import { annotation } from '../../../api';
import { zoomifyBaseUrl } from '../../../constants';

export const useViewer = ({ image, jobUserId }) => {
  const mapRef = useRef();
  const [annotationLayer, setAnnotationLayer] = useState(null);

  useEffect(() => {
    const setAnnotationLayerSource = async() => {
      const annotations = await annotation({
        jobUserId: jobUserId,
        imageInstanceId: image.id,
        imageWidth: image.width,
        imageHeight: image.height
      });
      
      const format = new WKT();
      let features = [];
      
      annotations.collection.forEach(annotation => {
        features.push(format.readFeature(annotation.location));
      });
  
      const annotationLayerSource = new VectorSource({
        features,
      });
  
      annotationLayer.setSource(annotationLayerSource);
    }

    if (annotationLayer) {
      setAnnotationLayerSource();
    }
  }, [annotationLayer]);

  useEffect(() => {
    const extent = [0, 0, image.width, image.height];

    const imageLayerSource = new Zoomify({
      url: "",
      size: [image.width, image.height],
      zDirection: -1,
      tileSize: image.tileSize,
      extent,
    });

    imageLayerSource.setTileUrlFunction((tileCoord) => {
      const [z, x, y] = tileCoord;

      const zoomOutLevel = image.zoom - z;
      const tilePixelSize = image.tileSize * Math.pow(2, zoomOutLevel);
      const numMaxTileRows = Math.ceil(image.width / tilePixelSize);

      const tileIndex = y * numMaxTileRows + x;
      
      return (
        zoomifyBaseUrl + image.path + `&tileIndex=${tileIndex}&z=${z}&mimeType=openslide/svs`
      )
    })

    const imageLayer = new TileLayer({
      source: imageLayerSource,
      maxZoom: image.zoom,
    });

    const _annotationLayer = new VectorLayer({
      source: null,
      opacity: 0.5,
      visible: true,
      style:[
        new Style({
          stroke: new Stroke({
            color: 'blue',
            width: 3
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          })
        })
      ],
    });

    const map = new Map({
      target: mapRef.current,
      layers: [imageLayer, _annotationLayer],
      view: new View({
        resolutions: imageLayer.getSource().getTileGrid().getResolutions(),
        extent,
        constrainOnlyCenter: true,
      })
    });

    map.getView().fit(extent);
    setAnnotationLayer(_annotationLayer);
  }, []);

  return {
    mapRef
  }
}