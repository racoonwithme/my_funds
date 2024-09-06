FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY ./expense_tracker/requirements.txt .
COPY ./vars ./vars
RUN pip install --no-cache-dir -r requirements.txt
COPY ./expense_tracker/expense_tracker ./expense_tracker
COPY ./expense_tracker/transactions ./transactions
COPY ./expense_tracker/manage.py .