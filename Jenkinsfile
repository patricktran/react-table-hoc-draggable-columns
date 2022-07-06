pipeline {

    options {
        timestamps()
        timeout(time: 90, unit: 'MINUTES')
        buildDiscarder(
                logRotator(
                        artifactDaysToKeepStr: '10',
                        artifactNumToKeepStr: '5',
                        daysToKeepStr: '10',
                        numToKeepStr: '5'
                )
        )
        ansiColor('xterm')
    }

    agent {
        docker {
            image 'docker.seal-software.net/build-agent-java11'
            args dockerArgs('--network="host"')
            label 'react-table-hoc-draggable-columns'
        }
    }
    environment {
        VERSION = buildVersion()
        SERVICE_NAME = 'react-table-hoc-draggable-columns'
    }

    stages {

        stage('env') {
            steps {
                echo "Echo environment"
                sh "node -v"
                sh "npm -v"
            }
        }

        stage('setup') {
            steps {
                echo "Installing dependencies"
                sh "npm ci"
            }
        }

        stage('build') {
            steps {
              echo "Building..."
              sh "npm run build"
            }
        }


        stage('deploy') {
            steps {
                script {
                    env.TS_VERSION = isMaster() ? env.VERSION : buildVersionNpm(env.NON_MASTER_NPM_VERSION)
                }
                sh '''
                    npm version ${TS_VERSION}
                    npm publish --registry https://nexus.seal-software.net/repository/npm-private/
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
