#!/usr/bin/env bash

set -eou pipefail

cd front
if [ -d "node_modules" ]; then
    yarn precommit
else
    echo "Skipping front precommit, yarn has not been run in front/ directory"
fi