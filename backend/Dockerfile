FROM python:3.10

WORKDIR /backend

COPY ./requirements.txt /backend/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./app /backend/app

WORKDIR /backend/app

CMD ["fastapi", "run", "main.py", "--port", "8080"]