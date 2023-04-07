const { setupBefore, setupChai, removeTestDB } = require('./utils/test-utils');
const chai = setupChai();
const expect = chai.expect;
const chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);

describe("Step #2 Specs", () => {
  let DB_TEST_FILE, SERVER_DB_TEST_FILE, models, server;
  before(async () => ({ server, models, DB_TEST_FILE, SERVER_DB_TEST_FILE } = await setupBefore(__filename)));
  after(async () => await removeTestDB(DB_TEST_FILE));

  describe("GET /bands", () => {
    it("GET /bands returns data about all the bands their respective musicians", async () => {
      await chai
        .request(server)
        .get("/bands")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          const schema = {
            type: 'array',
            maxItems: 5,
            minItems: 5,
            items: [
              {
                type: 'object',
                required: ['id', 'name', 'createdAt', 'updatedAt', 'Musicians'],
                properties: {
                  id: { type: 'number', const: 2 },
                  name: { type: 'string', const: "America The Piano" },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Musicians: {
                    type: 'array',
                    minItems: 2,
                    maxItems: 2,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 5 },
                          firstName: { type: 'string', const: "Georgette" },
                          lastName: { type: 'string', const: "Kubo" },
                          bandId: { type: 'number', const: 2 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 5 },
                          firstName: { type: 'string', const: "Marine" },
                          lastName: { type: 'string', const: "Sweet" },
                          bandId: { type: 'number', const: 2 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      }
                    ]
                  },
                }
              },
              {
                type: 'object',
                required: ['id', 'name', 'createdAt', 'updatedAt', 'Musicians'],
                properties: {
                  id: { type: 'number', const: 3 },
                  name: { type: 'string', const: "Loved Autumn" },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Musicians: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 1,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 6 },
                          firstName: { type: 'string', const: "Aurora" },
                          lastName: { type: 'string', const: "Hase" },
                          bandId: { type: 'number', const: 3 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      }
                    ],
                  },
                }
              },
              {
                type: 'object',
                required: ['id', 'name', 'createdAt', 'updatedAt', 'Musicians'],
                properties: {
                  id: { type: 'number', const: 4 },
                  name: { type: 'string', const: "Playin Sound" },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Musicians: {
                    type: 'array',
                    minItems: 2,
                    maxItems: 2,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 8 },
                          firstName: { type: 'string', const: "Camila" },
                          lastName: { type: 'string', const: "Nenci" },
                          bandId: { type: 'number', const: 4 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 7 },
                          firstName: { type: 'string', const: "Trenton" },
                          lastName: { type: 'string', const: "Lesley" },
                          bandId: { type: 'number', const: 1 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      }
                    ],
                  },
                }
              },
              {
                type: 'object',
                required: ['id', 'name', 'createdAt', 'updatedAt', 'Musicians'],
                properties: {
                  id: { type: 'number', const: 1 },
                  name: { type: 'string', const: "The Falling Box" },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Musicians: {
                    type: 'array',
                    minItems: 3,
                    maxItems: 3,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 1 },
                          firstName: { type: 'string', const: "Adam" },
                          lastName: { type: 'string', const: "Appleby" },
                          bandId: { type: 'number', const: 1 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 2 },
                          firstName: { type: 'string', const: "Anton" },
                          lastName: { type: 'string', const: "Martinovic" },
                          bandId: { type: 'number', const: 1 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 3 },
                          firstName: { type: 'string', const: "Wilson" },
                          lastName: { type: 'string', const: "Holt" },
                          bandId: { type: 'number', const: 1 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      }
                    ],
                  },
                }
              },
              {
                type: 'object',
                required: ['id', 'name', 'createdAt', 'updatedAt', 'Musicians'],
                properties: {
                  id: { type: 'number', const: 5 },
                  name: { type: 'string', const: "The King River" },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Musicians: {
                    type: 'array',
                    minItems: 2,
                    maxItems: 2,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 9 },
                          firstName: { type: 'string', const: "Rosemarie" },
                          lastName: { type: 'string', const: "Affini" },
                          bandId: { type: 'number', const: 5 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', const: 10 },
                          firstName: { type: 'string', const: "Victoria" },
                          lastName: { type: 'string', const: "Cremonesi" },
                          bandId: { type: 'number', const: 5 },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      }
                    ],
                  },
                }
              },
            ],
          };
          expect(res.body).to.be.jsonSchema(schema);
        });
    });
  });
});
