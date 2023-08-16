#FROM gradle:8.1.1-jdk17
#COPY ${JAR_FILE} app.jar
#EXPOSE 8080 8085
#ENTRYPOINT ["java","-jar","app.jar"]

FROM gradle:8.1.1-jdk17
ARG JAR_FILE=build/libs/*.jar
COPY BOSSNICESHOT-0.0.1-SNAPSHOT.jar /app.jar
CMD ["java", "-jar", "/app.jar"]