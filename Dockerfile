FROM node:18-alpine as frontend

WORKDIR /app
COPY my-frontend/package*.json ./ 
RUN npm install
COPY my-frontend/ .
RUN npm run build

FROM python:3.10-slim

WORKDIR /app

COPY my-backend/requirements.txt .
RUN pip install -r requirements.txt

COPY my-backend/ .

COPY --from=frontend /app/build ./static

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

EXPOSE 5000

CMD ["flask", "run"]
