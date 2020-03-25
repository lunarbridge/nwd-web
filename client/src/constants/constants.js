export const uploadedFileStatus = {
  0: "UPLOADED",
  1: "CONVERTED",
  2: "DEPLOYED",
  3: "ERROR_FORMAT",
  4: "ERROR_CONVERSION",
  5: "UNCOMPRESSED",
  6: "TO_DEPLOY",
  7: "TO_CONVERT",
  8: "ERROR_CONVERSION",
  9: "ERROR_DEPLOYMENT"
}

export const processStatus = {
  0: "NOT_LAUNCH",
  1: "IN_QUEUE",
  2: "RUNNING",
  3: "SUCCESS",
  4: "FAILED",
  5: "IN_DETERMINATE",
  6: "WAIT",
  7: "PREVIEWED",
  8: "KILLED"
}

export const zoomifyBaseUrl = process.env.REACT_APP_IMAGE_SERVER 
  + "/image/tile?zoomify=";

export const zoomifyUrlParam = "/&tileGroup={TileGroup}&z={z}&x={x}&y={y}&mimeType=openslide/svs";