FROM ibmcom/ibm-http-server

COPY dist/sample-app /opt/IBM/HTTPServer/htdocs
USER 1001
EXPOSE 80
