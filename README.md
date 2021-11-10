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

frontend ng-shop
 - Hosting: Firebase
 - Folder: /public
 - $: nx build ngshop --output-path public --prod)
 - $: firebase deploy
 - Hosting URL: https://nlx-mean-eshop.web.app

#### frontend admin
 - Hosting: Firebase
 - Folder: public-admin
 - $: nx build admin --output-path public-admin  --prod    


#### Firebase
$: firebase login
$: firebase init
$: firebase deploy

