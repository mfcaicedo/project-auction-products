# project-auction-products 
# Distributed System
# Project Developers 
## Milthon Ferney Caicedo Jurado - mfcaicedo@unicauca.edu.co
## Álvaro Daniel Erazo Ramirez - danieleraso@unicauca.edu.co

# Distributed system context
In this project, the REST service model will be implemented in a distributed way, a system that allows controlling the auction of a set of products. There are two roles, the administrators who manage the products to be auctioned and determine which product to auction, and the clients who can
Bid on a specific product.

# Data to manage

Of the administrators it is necessary to manage names, surnames, login and password.

Of the clients it is necessary to manage, names, surnames, email, telephone, login and password.

Of the products it is necessary to manage code, name and initial value of the product offer.

# Web services to develop

9 web services must be developed

The FrontEnd must be built with graphical interfaces in the Java language, and the BackEnd with REST services using the Spring framework. All web services must be associated with an echo that shows their execution.
explanation image: 
![image](https://user-images.githubusercontent.com/67482617/217947113-3cc7389e-702b-42a2-bcdb-04eabdc1e715.png)

# Web service 1:
It allows customers and administrators to register in the application, with their personal data, login and password.

# Web service 2:
Allows customers and administrators to log in.

# Web service 3:
Allows administrators to register a product to offer.

# Web service 4:
Allows administrators to list the products to offer.

# Web service 5:
Allows administrators to open or close an auction for a specific product based on their id.

# Webservice 6:
Allows customers to list products that are up for auction and those that are not up for auction.

# Web service 7:
Allows you to consult the data of the particular product.

# Web service 8:
It allows you to consult the data of the product that is currently being auctioned, and the value of the current offer. If there is no open auction, a message indicating that there are no open auctions should appear.
Note: Using an alternate execution thread, the web service must be consulted every 4 seconds and the screen refreshed with the result.

# Web service 9:
Allows a customer to offer an offer for the product that is currently being
auctioning. It should be considered that the offer made is higher than the current offer.

# Validations in the FrontEnd

 When a customer places a bid for the product that is currently being auctioned, it must be validated that the bid made is higher than the current bid.

 When opening or closing an auction for a specific product, it must be validated that the product exists.

 When a customer consults the data of the product that is currently being auctioned, if there is no open auction, a message should appear indicating that there are no open auctions.

 The initial offer for a product must be greater than the initial value of the product.

 Using an alternate execution thread, the web service must be consulted every 4 seconds and the screen refreshed with the result.

# Automatic validations in the BackEnd

 The names and surnames must be greater than 5 and less than 50.

 The login and password must be greater than 10 and less than 20.

 The email must follow the proper format.

 The phone must be 10 digits and start with 5.

# Design patterns applied:

 Model – view – controller

 Repository

 Data Transfer Object

 Dependency Injection

 Facade

 Layers

 Levels

# Frameworks and Lenguages 
## React JS FrontEnd 
## SpringBoot BackEnd

# Libraries and dependencies
# Yup 
## Description: 
Allows validations in the forms.
##Installation: npm i yup --save

# Formik 
## Description: 
Allows a easy management of Form. 
##Installation: npm i formik --save

# Tailwindcss 
## Description: 
Library for the styles to frontEnd project. 
##Installation: 
## npm install -D tailwindcss
## npx tailwindcss init
## Change line in the file: tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
## Add in index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

# PrimeReact 
## Description: 
Is a design-agnostic library and the theming system is based on the Theme Designer, the official tool to create themes for the components
## Installation: npm install primereact primeicons

# Axios 
## Description: 
Allows you to make requests to the server. 
## Intallation: npm i axios --save

# Supabase 
## Description: 
Cloud database manager
# Link: https://app.supabase.com/

# Run project 
## FrontEnd 
frontend-admin-products frontend-client-offer-auction
npm run start 

## BackEnd 
backend-auction-log-in
backend-auction-products
## Nota: use Itellij for a best experience. 










