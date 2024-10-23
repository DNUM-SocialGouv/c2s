java -Dlogback.log.dir="/opt/tomcat/webapps/c2s-oc" -jar OC_API-1.0-SNAPSHOT.jar --spring.config.location=file:application.local.yml > application.log 2>&1 &
