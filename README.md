# myExpense

Simple MERN stack app to keep track of your day to day expenses

## Features to include:

- [x] User Registration page
- [x] User Login page
- [x] Expesnse page
- [x] View Transaction page
- [x] While ading transaction, ask date also instead of picking current date
- [x] Show total expense
- [ ] Filter transactions based on month/year/category
- [ ] Client side pagination

## Room for Improvement:

---

### Current Issue:

None

### Dev setup

#### .env setup

Create **.env** file in root folder with following variables

<p><strong>mongoUser=[mlab or atlas or local db user name] </strong></p>
<p><strong>mongoPW=[mlab or atlas or local db password]</strong></p>
<p><strong>GAMIL_ID=[your gmail id or username from your email service provider]</strong></p>
<p><strong>GAMIL_PW=[your gmail pw or api pw or key from your email service provider]</strong></p>

#### Find inline comment in store.js to setup Redux dev tool for dev env

#### Setup for sending email

For Dev env use :
`service: '<Gmail or your service provider>', auth: { user: process.env.GMAIL_ID, pass: process.env.GMAIL_PW }`
While moving to prod use:
`host: "smtp.gmail.com", port: 465, secure: true, auth: { user: process.env.GMAIL_ID, pass: process.env.GMAIL_PW }`

#### To install dependencies for node and react

`npm i && npm i --prefix=client`

#### To run node and react localServer

`npm run dev`
