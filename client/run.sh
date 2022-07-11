docker run -d \
  --link ws:ws \
  -p 5000:5000 \
  --name slide-seg-frontend \
  fibremint/slide-seg-svc-frontend