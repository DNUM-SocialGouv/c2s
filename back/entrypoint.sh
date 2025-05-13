#!/bin/sh

java -jar /app/c2s-dev.jar --spring.config.location=file:/etc/c2s-dev/application.properties -Dsiren.api.key=${C2S_BACK_SIREN_API_KEY}