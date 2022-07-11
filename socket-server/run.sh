docker run -d \
  --link postgresql:postgresql \
  --name ws \
  fibremint/slide-seg-svc-ws