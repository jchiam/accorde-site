#!groovy

pipeline {
    agent any

    stages {
        stage('Pre-build') {
            steps {
                git 'https://github.com/jchiam/accorde-site.git'
                sh 'make prebuild'
            }
        }

        stage('Build') {
            steps {
                sh 'make build'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'firebase-token', variable: 'FIREBASE_TOKEN')]) {
                    sh 'make deploy-staging TOKEN=$FIREBASE_TOKEN'
                }
            }
        }
    }

    post {
        success {
            dir('dist') {
                deleteDir()
            }
            withCredentials([string(credentialsId: 'slack-token', variable: 'SLACK_TOKEN')]) {
                slackSend channel: '#it_dev', color: 'good', message: 'Build succeeded!', token: '$SLACK_TOKEN'
            }
        }
    }
}
