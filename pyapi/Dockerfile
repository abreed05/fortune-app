FROM python:3
WORKDIR /usr/src/app
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
EXPOSE 5000
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
