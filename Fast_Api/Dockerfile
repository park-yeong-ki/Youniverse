# Use the official Python image as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY ./app/requirements.txt /app/requirements.txt

# Install FastAPI and Uvicorn
RUN pip install uvicorn fastapi
RUN pip install -r /app/requirements.txt

# Copy the application code into the container
COPY ./app /app

# Expose port 8000
EXPOSE 8000

# Command to run the application
#uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
