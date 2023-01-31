# Bonus Practice: Lazy Loading Queries

In this bonus short practice, you will continue trying to lazy loading
associated data with **Sequelize** queries.

## Getting started

Download starter if you haven't already downloaded the original practice.

Execute the __setup-commands.sh__ script from the root directory of this
practice if you haven't already.

```shell
sh setup-commands.sh
```

View the contents of the script to see the commands that are executed. View the
results in the terminal to confirm that setup was successful and the `Bands`,
`Instruments`, `Musicians`, and `MusicianInstruments` tables exists in your
database and you have seed data present. The tables created follow the following
schema:

![band-musician-instrument-db-schema]

This practice includes `Bands` with a one-to-many association with `Musicians`,
as you have worked with in the previous route handlers, but it also includes
`Instruments` with a many-to-many association with `Musicians`. Let's see if you can
implement more endpoints (or expand upon those that you just worked with) that
take advantage of these associations.

## Bonus Step 1: Lazy load all the instruments of a single musician

Take a look at the route handler in __app.js__ for `GET /musicians` to get the
details of a `Musician` by `id` and all of its associated `Instruments`.

Implement this endpoint so that:

- It should query for the details of a specific `Musician`.
- It should make another query to find the associated `MusicianIntruments` to
  the specific musician. (Remember, `Musician` has a one-to-many relationship
  with `MusicianInstrument`.)
- It should make another query to find the associated `Instruments` to
  the `MusicianInstruments` found in the previous query. Order the `Instruments`
  by `type`. (Remember, `MusicianInstrument` has a many-to-one relationship with
  `Instrument`, therefore `Musician` has a many-to-many relationship with
  `Instrument`.)
- After these queries have been made, a `payload` object should be
  created and filled with the data about the `Musician`.
- Add the queried `Instruments` data associated with the musician to the
  `payload` object as a key of `Instruments`.
- The `payload` object should be returned as the JSON body of the response.

Test that the endpoints returns the specific band information and the associated
musicians by navigating `/musicians/2` which should yield the results below:

```json
{
  "id": 2,
  "firstName": "Anton",
  "lastName": "Martinovic",
  "bandId": 1,
  "createdAt": "2022-12-20T15:14:11.436Z",
  "updatedAt": "2022-12-20T15:14:11.436Z",
  "Instruments": [
    {
      "id": 4,
      "type": "bass",
      "createdAt": "2022-12-20T15:14:11.000Z",
      "updatedAt": "2022-12-20T15:14:11.000Z"
    },
    {
      "id": 1,
      "type": "piano",
      "createdAt": "2022-12-20T15:14:11.000Z",
      "updatedAt": "2022-12-20T15:14:11.000Z"
    }
  ]
}
```

Take some time to analyze the amount of SQL queries that you made for this one
endpoint. How many queries are needed for this endpoint?

Run `npm test test/bonus/bonus-step-1-spec.js` to pass the specs for this
endpoint.

## Bonus Step 2: Lazy load all the instruments of all the musicians

In addition to the musician details endpoint (`GET /musicians/:id`), your API
needs an endpoint to return data about all the `Musicians` and their associated
`Instruments` data.

Take a look at the route handler in __app.js__ for `GET /musicians`.

The route handler for `GET /musicians` should:

- Make a query to find all musicians ordered by `firstName`.
- Initialize a `payload` variable as an empty array.
- Loop through each musician returned from the first query that returns all the
  instruments.
- For each musician, make a query to find the associated `MusicianInstruments`
  for that musician.
- For each musician, make a query to find the associated `Instruments` to the
  `MusicianInstruments` found for that musician.
- For each musician, create a musician data object with the same attributes as
  the musician (`id`, `firstName`, `lastName`, `bandId`, `createdAt`,
  `updatedAt`).
- For each musician, add the queried `Instruments` data for a single musician to
  the musician data object as a key of `Instruments`.
- Add the data for a single musician and their associated `Instruments` to the
  `payload` array.
- The `payload` array should be returned as the JSON body of the response.

Test that you were able to fetch associated musicians by navigating to the
modified route in your browser. Navigating to `/musicians` should yield all
ten `Musicians`, ordered by `firstName`, with associated `Instruments` ordered
by `type`.

For example, navigating to `/musicians` should yield the results below:

```json
[
  {
    "id": 1,
    "firstName": "Adam",
    "lastName": "Appleby",
    "bandId": 1,
    "createdAt": "2022-12-20T15:14:11.430Z",
    "updatedAt": "2022-12-20T15:14:11.430Z",
    "Instruments": [
      {
        "id": 2,
        "type": "guitar",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      },
      {
        "id": 1,
        "type": "piano",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  },
  {
    "id": 2,
    "firstName": "Anton",
    "lastName": "Martinovic",
    "bandId": 1,
    "createdAt": "2022-12-20T15:14:11.436Z",
    "updatedAt": "2022-12-20T15:14:11.436Z",
    "Instruments": [
      {
        "id": 4,
        "type": "bass",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      },
      {
        "id": 1,
        "type": "piano",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  },
  {
    "id": 6,
    "firstName": "Aurora",
    "lastName": "Hase",
    "bandId": 3,
    "createdAt": "2022-12-20T15:14:11.442Z",
    "updatedAt": "2022-12-20T15:14:11.442Z",
    "Instruments": [
      {
        "id": 6,
        "type": "cello",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      },
      {
        "id": 5,
        "type": "violin",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  },
  {
    "id": 8,
    "firstName": "Camila",
    "lastName": "Nenci",
    "bandId": 4,
    "createdAt": "2022-12-20T15:14:11.445Z",
    "updatedAt": "2022-12-20T15:14:11.445Z",
    "Instruments": [
      {
        "id": 1,
        "type": "piano",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  },
  {
    "id": 5,
    "firstName": "Georgette",
    "lastName": "Kubo",
    "bandId": 2,
    "createdAt": "2022-12-20T15:14:11.441Z",
    "updatedAt": "2022-12-20T15:14:11.441Z",
    "Instruments": [
      {
        "id": 3,
        "type": "drums",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      },
      {
        "id": 8,
        "type": "saxophone",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      },
      {
        "id": 7,
        "type": "trumpet",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  },
  {
    "id": 4,
    "firstName": "Marine",
    "lastName": "Sweet",
    "bandId": 2,
    "createdAt": "2022-12-20T15:14:11.440Z",
    "updatedAt": "2022-12-20T15:14:11.440Z",
    "Instruments": [
      {
        "id": 8,
        "type": "saxophone",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  },
  {
    "id": 9,
    "firstName": "Rosemarie",
    "lastName": "Affini",
    "bandId": 5,
    "createdAt": "2022-12-20T15:14:11.449Z",
    "updatedAt": "2022-12-20T15:14:11.449Z",
    "Instruments": [
      {
        "id": 1,
        "type": "piano",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      },
      {
        "id": 5,
        "type": "violin",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  },
  {
    "id": 7,
    "firstName": "Trenton",
    "lastName": "Lesley",
    "bandId": 4,
    "createdAt": "2022-12-20T15:14:11.444Z",
    "updatedAt": "2022-12-20T15:14:11.444Z",
    "Instruments": [
      {
        "id": 1,
        "type": "piano",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  },
  {
    "id": 10,
    "firstName": "Victoria",
    "lastName": "Cremonesi",
    "bandId": 5,
    "createdAt": "2022-12-20T15:14:11.451Z",
    "updatedAt": "2022-12-20T15:14:11.451Z",
    "Instruments": [
      {
        "id": 5,
        "type": "violin",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  },
  {
    "id": 3,
    "firstName": "Wilson",
    "lastName": "Holt",
    "bandId": 1,
    "createdAt": "2022-12-20T15:14:11.437Z",
    "updatedAt": "2022-12-20T15:14:11.437Z",
    "Instruments": [
      {
        "id": 6,
        "type": "cello",
        "createdAt": "2022-12-20T15:14:11.000Z",
        "updatedAt": "2022-12-20T15:14:11.000Z"
      }
    ]
  }
]
```

Take some time to analyze the amount of SQL queries that you made for this one
endpoint. How many queries are needed for this endpoint?

Run `npm test test/bonus/bonus-step-2-spec.js` to pass the specs for this
endpoint.