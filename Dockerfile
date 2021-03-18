FROM ibmcom/ibm-http-server

COPY dist/sample-app /opt/IBM/HTTPServer/htdocs

EXPOSE 80
