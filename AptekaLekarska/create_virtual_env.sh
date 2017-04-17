#!/usr/bin/env bash
# Install virtualenv
python -m pip install virtualenv

# Create virtualenv
python -m virtualenv env

# Activate env
source env/bin/activate

# Install requirements
pip install -r requirements.txt

# Deactivate env
deactivate




