# syntax=docker/dockerfile-upstream:master-labs
# Docker extension to be able to copy all **/pom.xml files in one step

# ----- Stage 1: Build the application using Maven
FROM maven:3.9.9-ibm-semeru-17-focal AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY --parents pom.xml **/pom.xml ./

RUN mvn dependency:go-offline -B

# Copy the source code to the working directory
COPY . .

# Package the application (skip tests to speed up the build)
RUN mvn clean package -DskipTests

# ----- Stage 2: Run the application with a minimal JDK base image
FROM eclipse-temurin:17.0.13_11-jre-noble

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file from the build stage
COPY --from=build /app/spring-boot-jar-builder/target/c2s-dev.jar .

# Expose the application port (optional, customize if needed)
EXPOSE 8081

COPY entrypoint.sh entrypoint.sh

# Run the JAR file
ENTRYPOINT ["./entrypoint.sh"]


# nohup java -Dlogback.log.dir="/opt/tomcat/webapps/c2s-oc" -jar OC_API-1.0-SNAPSHOT.jar --spring.config.location=file:application.local.yml > application.log 2>&1 &