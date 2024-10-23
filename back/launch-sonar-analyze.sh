#!/bin/bash

mvn clean verify sonar:sonar -Dsonar.projectKey=C2S-local---dev-clean-secret -Dsonar.host.url=http://localhost:9000 -Dsonar.login=sqp_d1ce6b2e275518c9fef81a062a6720831f1b71ef