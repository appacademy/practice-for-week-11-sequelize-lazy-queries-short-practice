# Practice: Lazy Loading Queries

In this short practice, you will try lazy loading associated data with
**Sequelize** queries.

## Getting started

Download starter.

Execute the __setup-commands.sh__ script from the root directory of this
practice.

```shell
sh setup-commands.sh
```

View the contents of the script to see the commands that are executed. View the
results in the terminal to confirm that setup was successful and the `Bands`,
`Instruments`, `Musicians`, and `MusicianInstruments` tables exists in your
database and you have seed data present. The tables created follow the following
schema:

![band-musician-instrument-db-schema]

In this practice you will be implementing the endpoints in __app.js__ which will
query your database for `Bands` and their associated `Musicians`. You will
lazy loading associated data associated data.

## Step 1: Lazy load the musicians of a single the band

Take a look at the route handler in __app.js__ for `GET /bands/:bandId`.

Right now, it makes a query to get the details of a single `Band` by `id`.

Modify this endpoint so that:

- It should make another query to find the associated `Musicians` to the specific
  band and save the results to the variable `bandMembers`. (Remember, `Band` has
  a one-to-many relationship with `Musician`.)
- After these queries have been made, a `payload` object should be
  created and filled with the data about the `Band`.
- Add the queried `Musicians` data associated with the band (`bandMembers`) to
  the `payload` object as a key of `Musicians`.
- The `payload` object should be returned as the JSON body of the response.

Test that the endpoints returns the specific band information and the associated
musicians by navigating `/bands/2` which should yield the results below:

```json
{
  "id": 2,
  "name": "America The Piano",
  "createdAt": "2021-10-21T21:51:14.000Z",
  "updatedAt": "2021-10-21T21:51:14.000Z",
  "Musicians": [
    {
      "id": 5,
      "firstName": "Georgette",
      "lastName": "Kubo",
      "bandId": 2,
      "createdAt": "2021-10-21T21:51:14.000Z",
      "updatedAt": "2021-10-21T21:51:14.000Z"
    },
    {
      "id": 4,
      "firstName": "Marine",
      "lastName": "Sweet",
      "bandId": 2,
      "createdAt": "2021-10-21T21:51:14.000Z",
      "updatedAt": "2021-10-21T21:51:14.000Z"
    }
  ]
}
```

Take some time to analyze the amount of SQL queries that you made for this one
endpoint. How many queries are needed for this endpoint?

Run `npm test test/step-1-spec.js` to pass the specs for this endpoint.

## Step 2: Lazy load the musicians of all the bands

In addition to the band details endpoint (`GET /bands/:id`), your API needs
an endpoint to return data about all the `Bands` and their associated
`Musicians` data.

Take a look at the route handler in __app.js__ for `GET /bands`.

The route handler for `/bands` currently queries for all `Bands` and orders
them by `name`.

Modify this endpoint's code so that you:

- Loop through each band returned from the first query that returns all the
  bands.
- For each band, make a query to find the associated `Musicians` for that
  band and order the musicians by `firstName`.
- For each band, create a band data object with the same attributes as the
  band (`id`, `name`, `createdAt`, `updatedAt`).
- For each band, add the queried `Musicians` data for a single band to the band
  data object as a key of `Musicians`.
- Add the data for a single band and their associated `Musicians` to the
  `payload` array
- The `payload` array should be returned as the JSON body of the response.

Test that you were able to fetch associated musicians by navigating to the
modified route in your browser. Navigating to `/bands` should yield all
five `Bands`, ordered by `name`, with associated `Musicians` ordered by
`firstName`.

For example, navigating to `/bands` should yield the results below:

```json
{
  "id": 2,
  "name": "America The Piano",
  "createdAt": "2021-10-21T21:51:14.000Z",
  "updatedAt": "2021-10-21T21:51:14.000Z",
  "Musicians": [
    {
      "id": 5,
      "firstName": "Georgette",
      "lastName": "Kubo",
      "bandId": 2,
      "createdAt": "2021-10-21T21:51:14.000Z",
      "updatedAt": "2021-10-21T21:51:14.000Z"
    },
    {
      "id": 4,
      "firstName": "Marine",
      "lastName": "Sweet",
      "bandId": 2,
      "createdAt": "2021-10-21T21:51:14.000Z",
      "updatedAt": "2021-10-21T21:51:14.000Z"
    }
  ]
}
```

Run `npm test test/step-2-spec.js` to pass the specs for this endpoint.

## Congratulations!

Run `npm test` to make sure all the tests still pass.

Congratulations! You are now able to utilize lazy eager loading of associated
data with **Sequelize**.

## Submission

Submit your work.

1. Delete the `node_modules` folder in the __server__ directory
2. Zip up the project folder
3. Submit the zip file

[band-musician-instrument-db-schema]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-11/practices/band-musician-instrument-db-schema.png
[band-musician-instrument-db-diagram-info]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-11/practices/band-musician-instrument-db-diagram-info.txt