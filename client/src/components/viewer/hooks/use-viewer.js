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
import { zoomifyBaseUrl, zoomifyUrlParam } from '../../../constants';

export const useViewer = ({ image, jobUserId }) => {
  const mapRef = useRef();
  const [features, setFeatures] = useState([]);
  const [map, setMap] = useState(null);
  const [imageLayer, setImageLayer] = useState(null);
  const [annotationLayer, setAnnotationLayer] = useState(null);

  useEffect(() => {
    const _imageLayer = new TileLayer({
      source: null,
      maxResolution: null
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
      maxResolution: null
    });

    const _map = new Map({
      target: mapRef.current,
      layers: [_imageLayer, _annotationLayer],
      view: null
    });

    setImageLayer(_imageLayer);
    setAnnotationLayer(_annotationLayer);
    setMap(_map);
  }, []);

  useEffect(() => {
    const fetch = async() => {
      const annotations = await annotation({
        jobUserId: jobUserId,
        imageInstanceId: image.id,
        imageWidth: image.width,
        imageHeight: image.height
      });       

      const format = new WKT();
      const features = [];
      
      annotations.collection.forEach(annotation => {
        features.push(format.readFeature(annotation.location));
      });

      setFeatures(features);
    }

    fetch();
  }, [image, jobUserId]);
  
  useEffect(() => {
    if (imageLayer && annotationLayer && map) {
      const extent = [0, 0, image.width, image.height];
      const maxResolution = Math.pow(2, image.depth);

      const imageLayerSource = new Zoomify({
        url: zoomifyBaseUrl + image.fullPath + zoomifyUrlParam,
        size: [image.width, image.height],
        extent: extent
      });

      const annotationLayerSource = new VectorSource({
        features: features
      });

      const mapView = new View({
        resolution: imageLayerSource.getTileGrid().getResolution(),
        extent: extent, 
      });

      // mapView.setMinZoom(-16);

      imageLayer.setSource(imageLayerSource);
      imageLayer.setMaxResolution(maxResolution);
      imageLayer.setMinZoom(0);

      annotationLayer.setSource(annotationLayerSource);
      annotationLayer.setMaxResolution(maxResolution);
      annotationLayer.setMinZoom(0);

      map.setView(mapView);
      map.getView().fit(extent);
    }
  }, [features]);
  
  return {
    mapRef
  }
}