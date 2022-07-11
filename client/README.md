# Slide segmentation web frontend
업로드 한 슬라이드를 관리하는 대시보드와 세분화 된 결과를 시각화하여 제공하는 프론트엔드 입니다.

## Build
환경변수 파일 `.env.local.example`을 `.env`로 복사하고 운영하는 환경에 해당되는 값들을 변경 및 저장합니다.

예. `core` 서버의 주소가 `https://core.example.com` -> `REACT_APP_REMOTE_SERVER=https://core.example.com`으로 설정.

Docker build로 이미지를 빌드합니다.