# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for	
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "bento/ubuntu-16.04"

  config.vm.network "forwarded_port", guest: 8080, host: 8080

  # config.vm.synced_folder "../data", "/vagrant_data"

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
  
  config.vm.provision "docker" do |d|
    d.build_image "/vagrant/docker",
     args: "-t zairza/web"
    d.pull_images "mongo"
    d.run "mongo"
    d.run "zairza/web",
      args: "--link 'mongo:db' -v '/vagrant:/srv/www/zairza-web' -p 8080:8080"
  end
  
    config.vm.provision "shell", inline: <<-SHELL
      echo `whoami`
#      yum install -y yum-presto
      apt-get update
#      rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-6.noarch.rpm
      apt-get install -y nginx
  SHELL

    config.vm.provision "file", source: "config/nginx.conf", destination: "~/conf/nginx.conf"
    config.vm.provision "file", source: "config/nginx/gzip.conf", destination: "~/conf/nginx/gzip.conf"
    config.vm.provision "file", source: "config/nginx/zairza.in.conf", destination: "~/conf/nginx/zairza.in.conf"
    config.vm.provision "shell", inline: <<-SHELL
         cp /home/vagrant/conf/nginx.conf /etc/nginx/nginx.conf
         cp /home/vagrant/conf/nginx/* /etc/nginx/conf.d
         service nginx restart
    SHELL
end
