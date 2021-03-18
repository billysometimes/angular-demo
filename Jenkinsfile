

/* The path, relative to the root of the repo (where this Jenkinsfile is),
 * where the file that contains the version tag (e.g. 1.0) resides.
 *\/
final APP_VERSION_FILE = 'app/VERSION'

pipeline {
    agent any
    stages {

        /** Create Credentials
         *
         * Create a Jenkins Credential from OpenShift Secret
         * In this case the OpenShift service tokens for the other
         * environments.
         */


        /** Dev - MochaJS Test
         *
         *  Using agent labeled `nodejs` which is defined in the Kubernetes Jenkins plugin will
         *  launch a nodejs pod to run the steps section actions.
         *\/

        stage('Dev - MochaJS Test') {
            agent {
                label 'nodejs'
            }
            steps {
                dir('app') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
    }
}

**/

pipeline {
    agent {
        node {label 'nodejs'}
    }
    environment {
        APPLICATION_NAME = 'sample-app'
        GIT_REPO="https://github.com/billysometimes/angular-demo.git"
        GIT_BRANCH="main"
        STAGE_TAG = "promoteToQA"
        DEV_PROJECT = "my-hello-world"
        STAGE_PROJECT = "stage"
        TEMPLATE_NAME = "angular-httpd"
        ARTIFACT_FOLDER = "dist"
        PORT = 80;
    }
    stages {
        stage('Get Latest Code') {
            steps {
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
            }
        }
        stage ("Install Dependencies") {
            steps {
                sh """
                npm install
                """
            }
        }
       /** stage('Run Tests') {
            steps {
                sh '''
                npm test
                '''
            }
        }**/
        stage('Build Application'){
            steps{
                script{
                sh '''
                npm run build
                '''
                }
            }
        }
        stage('Create Image Builder') {
            when {
                expression {
                    openshift.withCluster() {
                        openshift.withProject(DEV_PROJECT) {
                            return !openshift.selector("bc", "${TEMPLATE_NAME}").exists();
                        }
                }
            }
        }
        steps {
            script {
                openshift.withCluster() {
                    openshift.withProject(DEV_PROJECT) {
                        openshift.newBuild("--name=${TEMPLATE_NAME}", "--docker-image=docker.io/ibmcom/ibm-http-server:9.0.5.0", "--binary=true")
                        }
                    }
                }
            }
        }
        stage('Build Image') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject(env.DEV_PROJECT) {
                            openshift.selector("bc", "$TEMPLATE_NAME").startBuild("--from-dir=${ARTIFACT_FOLDER}/${APPLICATION_NAME}", "--wait=true")
                        }
                    }
                }
            }
        }
        stage('Deploy to DEV') {
            when {
                expression {
                    openshift.withCluster() {
                        openshift.withProject(env.DEV_PROJECT) {
                            return !openshift.selector('dc', "${TEMPLATE_NAME}").exists()
                        }
                    }
                }
            }
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject(env.DEV_PROJECT) {
                            def app = openshift.newApp("${TEMPLATE_NAME}:latest")
                            app.narrow("svc").expose("--port=${PORT}");
                            def dc = openshift.selector("dc", "${TEMPLATE_NAME}")
                            while (dc.object().spec.replicas != dc.object().status.availableReplicas) {
                                sleep 10
                            }
                        }
                    }
                }
            }
        }
        /**stage('Promote to STAGE?') {
            steps {
                timeout(time:15, unit:'MINUTES') {
                    input message: "Promote to STAGE?", ok: "Promote"
                }
                script {
                    openshift.withCluster() {
                        openshift.tag("${DEV_PROJECT}/${TEMPLATE_NAME}:latest", "${STAGE_PROJECT}/${TEMPLATE_NAME}:${STAGE_TAG}")
                    }
                }
            }
        }
        stage('Rollout to STAGE') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject(STAGE_PROJECT) {
                            if (openshift.selector('dc', '${TEMPLATE_NAME}').exists()) {
                                openshift.selector('dc', '${TEMPLATE_NAME}').delete()
                                openshift.selector('svc', '${TEMPLATE_NAME}').delete()
                                openshift.selector('route', '${TEMPLATE_NAME}').delete()
                            }
                        openshift.newApp("${TEMPLATE_NAME}:${STAGE_TAG}").narrow("svc").expose("--port=${PORT}")
                        }
                    }
                } 
            }
        }
        stage('Scale in STAGE') {
            steps {
                script {
                    openshiftScale(namespace: "${STAGE_PROJECT}", deploymentConfig: "${TEMPLATE_NAME}", replicaCount: '3')
                }
            }
        }**/
    }
}