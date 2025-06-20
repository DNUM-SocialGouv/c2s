#!/usr/bin/env bash

set -eou pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd ${SCRIPT_DIR}/.. && pwd)"
GITLIST_IGNORED_SECRETS_FILE=gitleaks-ignored-secrets.json

echo "Detecting secrets with gitleaks"

if which gitleaks &> /dev/null; then
    echo "... using native gitleaks"$
    gitleaks dir -v --baseline-path $ROOT_DIR/$GITLIST_IGNORED_SECRETS_FILE
else
    echo "... using docker gitleaks"
    #docker run -v $ROOT_DIR:/app zricethezav/gitleaks:latest dir -v --baseline-path /app/gitleaks-ignored-secrets.json /app
fi