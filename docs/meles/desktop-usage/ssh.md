---
sidebar_label: 'SSH'
sidebar_position: 80
---

# SSH

This is a tutorial on how to access the board remotely from another computer using SSH.

Open a command line window according to [Open the Command Line](./cmdLine.md).

- Check the status of the SSH service. Run the following command in a command line window

```
sudo service ssh status
```

![ssh-1](/docs/meles/ssh-1.webp)

- Enter the following command

```
ssh [username]@[IP address]
```

Example:

```
ssh milkv@192.168.2.180
```

- You need to enter the user password to successfully connect to the Debian system. This is a basic SSH connection process. You can use other SSH options for more advanced connections.

![ssh-2](/docs/meles/ssh-2.webp)

## Notice

SSH is installed by default.

If the SSH service is not installed, you can use the following command to install it:

```
sudo apt-get update
sudo apt-get install ssh
```

If the SSH service is not started or runs abnormally, run the following command to restart it:

```
sudo service sshd restart
```