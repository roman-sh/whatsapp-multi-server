# whatsapp-multi-server

## How to install on digitalocean droplet:

1. Install nodeJS:  
    Install nvm (node version manager):  
    `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`  
    `source ~/.bashrc`
    
    Install node:  
    `nvm install 16.14.0`
    
2. Clone the project:  
  `git clone https://github.com/roman-sh/whatsapp-multi-server.git`
  
3. Install:  
  `cd whatsapp-multi-server`  
  `npm i`
  
4. Add missing library for puppeteer:  
  `sudo apt-get install -y libgbm-dev`
  
5. Install pm2:  
  `npm i -g pm2`  
  
6. Run app:  
  `pm2 start ./server.js`  
  

## Connect a new phone:  
    Delete WWebJS directory:  
    `rm -rf WWebJS/` 
