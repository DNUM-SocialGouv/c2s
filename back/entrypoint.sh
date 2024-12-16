#!/bin/sh

java -jar /app/c2s-dev.jar --spring.config.location=file:/etc/c2s-dev/application.properties -Dsiren.keyconsumer=${C2S_BACK_SIREN_KEY_CONSUMER} -Dsiren.secretconsumer=${C2S_BACK_SIREN_KEY_CONSUMER}