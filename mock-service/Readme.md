# Mock Services REST API

This service models the WebSphere Commerce REST API locally by defining various
routes that map to the out-of-box REST operations that WC provides. It can
also be used for any RESTful service that returns- [Mock Services REST API](#mock-services-rest-api)

- [Mock Services REST API](#mock-services-rest-api)
  - [Using the Service](#using-the-service)
    - [`npm install`](#npm-install)
    - [`npm run mock-db`](#npm-run-mock-db)
    - [`npm run mock-service`](#npm-run-mock-service)
  - [Available Routes and Operations](#available-routes-and-operations)
    - [GET /wcs/resources/store/:storeId/person/@self/contact](#get-wcsresourcesstorestoreidpersonselfcontact)
    - [GET /person-contact-:countryCode](#get-person-contact-countrycode)
    - [POST /person-contact-:countryCode](#post-person-contact-countrycode)
      - [Example Request Body](#example-request-body)
      - [Example CURL Request](#example-curl-request)
      - [Example Response](#example-response)

## Using the Service

Ensure that you have all the required dependencies

### `npm install`

If this is your first time using this service, create a "database"

### `npm run mock-db`

This will generate `./db.json` (not version controlled) in your workspace.
The DB allows you to perform various POST and PUT operations defined in the
service. If you need a fresh start, you can always re-run this command.

Now that you have a DB, start the service

### `npm run mock-service`

This will start the mock services server running on port 3001.

## Available Routes and Operations

---

### GET /wcs/resources/store/:storeId/person/@self/contact

Returns a random set of shipping or billing (or both types) address based on
storeId.

- **PARAM** `:storeId` - 10301 (US) or 10302 (CA)
- **QUERY** `addressType` - Shipping, Billing, or ShippingAndBilling
- **QUERY** `amount` - The number of addresses you'd like, if not specified, the
  service will return a random amount.

---

### GET /person-contact-:countryCode

Returns shipping or billing addresses from `./db.json`.

- **PARAM** `:countryCode` - US or CA
- **QUERY** `addressType` - Shipping, Billing, or ShippingAndBilling

---

### POST /person-contact-:countryCode

Create a new address in `./db.json`

- **PARAM** `:countryCode` - US or CA
- **HEADER** `Content-Type: application/json` (Required)

#### Example Request Body

```json
{
  "contact": [
    {
      "nickName": "Mary-1234",
      "firstName": "Mary",
      "lastName": "Smith",
      "addressType": "Shipping",
      "zipCode": "98075",
      "addressLine": ["100 main st.", "Suite 100", ""],
      "city": "Seattle",
      "state": "WA",
      "country": "US",
      "email1": "abc@xyz.com",
      "email2": "user1@abc.com",
      "phone1": "9191234567"
    }
  ],
  "userId": "464794507"
}
```

#### Example CURL Request

```bash
curl -XPOST -H "Content-type: application/json" -d '{
 "contact": [{
   "nickName": "Mary-2",
   "firstName": "Mary",
   "lastName": "Smith",
   "addressType": "Shipping",
   "zipCode": "98075",
   "addressLine": [
     "100 main st.",
     "Suite 100",
     ""
   ],
   "city": "Seattle",
   "state": "WA",
   "country": "US",
   "email1": "abc@xyz.com",
   "email2": "user1@abc.com",
   "phone1": "9191234567"
  }],
 "userId": "464794507"
}' 'http://localhost:3001/person-contact-US'
```

#### Example Response

```json
{
  "userId": "464794507",
  "addressId": "335898504"
}
```

---
