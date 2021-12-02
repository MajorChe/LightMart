
![describe the screenshot](url)
Modern NFT marketplace
================================

## Background

An NFT (non-fungible token) represents proof of ownership over a digital asset which can be verified on a blockchain. 
While NFTs are an exciting new technology with many interesting applications, the most popular use case is digital art. 

In recent months, with media coverage surrounding famous digital artist - Beeple, as well as notable collections including Cryptopunks, BAYC, and CyberKongz Genesis, digital non-fungible artwork has become the center of media attention.

Unfortunately, despite all of the coverage on the topic, the learning curve for the average user looking to use this technology is very steep. 

To solve this problem, we have developed - lightmart - a buy & sell marketplace specializing in NFTs. 

Lightmart's user-friendly interface takes away the learning curve associated with purchasing NFTs and allows the average user to enter the market. 

***

## Screenshots 

![describe the screenshot](url)
![describe the screenshot](url)
![describe the screenshot](url)
![describe the screenshot](url)

## Features

## When user is logged out:

- Ability to `Register` for an acconut and `Login` to an existing account 
- Option to `Filter` NFT listings `by Price` in `Ascending` (low to high) and `Descending` (high to low) order

## When user is logged in:

- `Favourite` a posting
- `Create` a new posting
- Mark a posting as `Sold`
- `Delete` a posting
- `Contact` a seller 

***

## Development setup

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
5. Install dependencies: `npm i`
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`

***

## Dependencies 

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Bootstrap















