# Build stage
FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean install

# Package stage
FROM eclipse-temurin:17-jdk
COPY --from=build /target/demo-0.0.1-SNAPSHOT.war app.war
ENTRYPOINT ["java", "-jar", "app.war"]
EXPOSE 8080


