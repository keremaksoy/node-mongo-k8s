## Nodejs , MongoDB  on Kubernetes
### Prerequisites
- Git supposed to be installed on the system ( [install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git "Git installation guide") )
- Minikube must be installed and running ( [install Minikube](https://kubernetes.io/docs/tasks/tools/ "installng minikube") )
- Helm must be installed ( [install Helm](https://helm.sh/docs/intro/install/ "installing Helm") )
- Docker supposed to be installed ( [install Docker](https://docs.docker.com/get-docker/ "install docker") )

### Deployment
**Clone the puplic repository using git :**
- git clone https://github.com/keremaksoy/node-mongo-k8s.git

**Start Minikube :**
- minikube start

**Point local Docker environment to minikube :**
- eval $(minikube docker-env)  ( Linux )
- & minikube -p minikube docker-env | Invoke-Expression ( Windows )

**Build Docker image :**
- docker-compose build

**Create namespaces for dev and prod environments :**
- kubectl create namespace dev
- kubectl create namespace prod

**Deploy mongodb for dev and prod environments with Helm :**
- helm install my-db --namespace dev --set mongodbRootPassword=mypassword,mongodbUsername=my-user,mongodbPassword=mypassword,mongodbDatabase=test stable/mongodb
- helm install my-db --namespace prod --set mongodbRootPassword=mypassword,mongodbUsername=my-user,mongodbPassword=mypassword,mongodbDatabase=test stable/mongodb

**Create deployments using the deploy.yaml file :**
- kubectl create -f deploy_dev.yaml --namespace=dev
- kubectl create -f deploy_prod.yaml --namespace=prod

**Expose deployments with LoadBalancer :**
- kubectl expose deployment nodejs-deployment --type=LoadBalancer --port=4000 --namespace=dev
- kubectl expose deployment nodejs-deployment --type=LoadBalancer --port=4000 --namespace=prod

**Start services :**
- minikube service nodejs-deployment --namespace=dev
- minikube service nodejs-deployment --namespace=prod
