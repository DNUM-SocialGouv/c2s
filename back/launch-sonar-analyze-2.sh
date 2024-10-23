#!/bin/bash

mvn clean verify sonar:sonar -Dsonar.projectKey=c2s -Dsonar.host.url=http://localhost:9000 -Dsonar.login=sqp_e4cc49bd35907a0e6215a08d748ef1553fee7b32