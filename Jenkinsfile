pipeline {
    agent any

    stages {

        stage('Git Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                docker build \
                -t cloudnative-backend:latest \
                ./backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                docker build \
                -t cloudnative-frontend:latest \
                ./frontend
                '''
            }
        }

        stage('Import Images Into K3s') {
            steps {
                sh '''
                docker save cloudnative-backend:latest \
                -o backend.tar

                docker save cloudnative-frontend:latest \
                -o frontend.tar

                sudo /usr/local/bin/k3s ctr images import backend.tar

                sudo /usr/local/bin/k3s ctr images import frontend.tar
                '''
            }
        }

	stage('Deploy To Kubernetes') {
    	    steps {
       		 sh '''
        	export KUBECONFIG=/var/lib/jenkins/.kube/config

        	kubectl apply -f k8s/

        	kubectl rollout restart deployment/backend \
        	-n cloudnative

        	kubectl rollout restart deployment/frontend \
        	-n cloudnative
        	'''
  	  }
 	 }
	}

    post {

        success {
            echo 'Cloud Native Task Manager deployed successfully'
        }

        failure {
            echo 'Deployment failed'
        }

        always {
            sh '''
            rm -f backend.tar frontend.tar
            '''
        }
    }
}
