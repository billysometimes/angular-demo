

/* The path, relative to the root of the repo (where this Jenkinsfile is),
 * where the file that contains the version tag (e.g. 1.0) resides.
 */
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
         */

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