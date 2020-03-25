# Slide segmentation web service

This serivce provides management of the slides and check segmented results based on [Cytomine](https://github.com/cytomine-uliege)

## Requirements

1. Install [Cytomine](https://github.com/cytomine-uliege) (not a official release, forked version)
2. Add [Segmentation](https://github.com/fibremint/cm-software_segmentation-predict) software on your Cytomine web interface
3. Copy each project's .env.example to .env and edit environment variables to meet your setup. The ```WS_SERVER``` on .env at ```client``` should be  ```socket-server```'s exposed running address
4. Run ```npm install``` to install dependencies
