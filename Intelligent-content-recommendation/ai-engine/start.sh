#!/bin/bash

# Export environment variables
export $(cat .env | xargs)

# Install dependencies
pip install -r requirements.txt

# Start the application
python main.py