# udemy-angular-mean-stack-ecommerce

NodeJS - ExpressJS - Angular - NX Monorepo - PrimeNG - MongoDB - Heroku

eshop-backend: npm run start

eshop-front/shop : nx serve ngshop

eshop-front/admin : nx serve admin --port=4201

fake user : nicolas@gmail.com + 123456

Stripe disabled


## Comments

#### backend nodeJS + mongoDB
 - Hosting: Heroku

#### frontend ng-shop
 - Hosting: Firebase
 - $: nx build ngshop --output-path public --prod
 - $: firebase login + init + deploy
 - Folder: /public
 - $: firebase deploy
 - Hosting URL: https://nlx-mean-eshop.web.app

#### frontend admin
 - Hosting: Infinityfree.com (FTP)
 - $: nx build admin --prod    
 - Folder: doc (Angular default)
- Hosting URL: http://nlx-mean-eshop-admin.infinityfreeapp.com/