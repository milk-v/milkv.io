---
sidebar_label: 'Using Docker'
sidebar_position: 10 
---

# Using Docker

Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker's methodologies for shipping, testing, and deploying code, you can significantly reduce the delay between writing code and running it in production.

## Install Docker

For Milk-V Jupiter's Ubuntu Desktop and Bianbu Desktop operating systems, you can directly use the following command to install Docker.

Update source:
```
sudo apt update
```

Install Docker：
```
sudo apt install docker.io
```

:::tip
When using the following Docker-related commands, if you encounter permission issues, try adding `sudo` before the command to increase execution permissions.
:::

## Pull the Docker image

The image of the Debian-based system has been pre-installed on the Spacemit harbor server. We can pull the image to test the use of Docker.

### Pull the image

```bash
docker pull harbor.spacemit.com/library/debian:unstable-slim
```

### List the image that has been pulled

```bash
docker images
```

The results are as follows:
```
milkv@k1:~$ sudo docker images
REPOSITORY                           TAG             IMAGE ID       CREATED       SIZE
harbor.spacemit.com/library/debian   unstable-slim   0b7da19f6d95   3 weeks ago   67.6MB
```

### Run Docker

Create a container named debian from the pulled image:

```bash
docker run -itd --name debian harbor.spacemit.com/library/debian:unstable-slim
```

### View running containers

```bash
docker ps
```

### Enter the container

```bash
docker exec -it debian bash
```

## Other common Docker commands

### View All Containers

```bash
docker ps -a
```

### Exit the container

```bash
exit
```

### Stop the container

Use `docker ps -a` to view the container ID and then stop it:

```bash
docker stop be067d972b86
```

### Restart a stopped container

```bash
docker restart be067d972b86
```

### Deleting a container

```bash
docker rm -f be067d972b86
```

### Clean up all containers in the terminated state

```
docker container prune
```

### Delete the pulled image

```bash
docker rmi harbor.spacemit.com/library/debian:unstable-slim
```
