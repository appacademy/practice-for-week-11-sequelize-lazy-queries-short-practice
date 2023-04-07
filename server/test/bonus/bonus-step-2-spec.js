const { setupBefore, setupChai, removeTestDB } = require('../utils/test-utils');
const chai = setupChai();
const expect = chai.expect;
const chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);

describe('Bonus Step #2 Specs', () => {
  let DB_TEST_FILE, SERVER_DB_TEST_FILE, models, server;
  before(async () => ({ server, models, DB_TEST_FILE, SERVER_DB_TEST_FILE } = await setupBefore(__filename)));
  after(async () => await removeTestDB(DB_TEST_FILE));

  describe('GET /musicians', () => {
    it('GET /musicians returns data about all the musicians and their respective instruments', async () => {
      await chai
        .request(server)
        .get("/musicians")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          const schema = {
            type: 'array',
            maxItems: 10,
            minItems: 10,
            items: [
              {
                type: 'object',
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [1] },
                  firstName: { type: 'string', enum: ["Adam"] },
                  lastName: { type: 'string', enum: ["Appleby"] },
                  bandId: { type: 'number', enum: [1] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 2,
                    maxItems: 2,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [2] },
                          type: { type: 'string', enum: ["guitar"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [1] },
                          type: { type: 'string', enum: ["piano"] },
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
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [2] },
                  firstName: { type: 'string', enum: ["Anton"] },
                  lastName: { type: 'string', enum: ["Martinovic"] },
                  bandId: { type: 'number', enum: [1] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 2,
                    maxItems: 2,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [4] },
                          type: { type: 'string', enum: ["bass"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [1] },
                          type: { type: 'string', enum: ["piano"] },
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
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [6] },
                  firstName: { type: 'string', enum: ["Aurora"] },
                  lastName: { type: 'string', enum: ["Hase"] },
                  bandId: { type: 'number', enum: [3] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 2,
                    maxItems: 2,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [6] },
                          type: { type: 'string', enum: ["cello"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [5] },
                          type: { type: 'string', enum: ["violin"] },
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
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [8] },
                  firstName: { type: 'string', enum: ["Camila"] },
                  lastName: { type: 'string', enum: ["Nenci"] },
                  bandId: { type: 'number', enum: [4] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 1,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [1] },
                          type: { type: 'string', enum: ["piano"] },
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
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [5] },
                  firstName: { type: 'string', enum: ["Georgette"] },
                  lastName: { type: 'string', enum: ["Kubo"] },
                  bandId: { type: 'number', enum: [2] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 3,
                    maxItems: 3,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [3] },
                          type: { type: 'string', enum: ["drums"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [8] },
                          type: { type: 'string', enum: ["saxophone"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [7] },
                          type: { type: 'string', enum: ["trumpet"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                    ]
                  },
                }
              },
              {
                type: 'object',
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [4] },
                  firstName: { type: 'string', enum: ["Marine"] },
                  lastName: { type: 'string', enum: ["Sweet"] },
                  bandId: { type: 'number', enum: [2] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 1,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [8] },
                          type: { type: 'string', enum: ["saxophone"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                    ]
                  },
                }
              },
              {
                type: 'object',
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [9] },
                  firstName: { type: 'string', enum: ["Rosemarie"] },
                  lastName: { type: 'string', enum: ["Affini"] },
                  bandId: { type: 'number', enum: [5] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 2,
                    maxItems: 2,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [1] },
                          type: { type: 'string', enum: ["piano"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [5] },
                          type: { type: 'string', enum: ["violin"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                    ]
                  },
                }
              },
              {
                type: 'object',
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [7] },
                  firstName: { type: 'string', enum: ["Trenton"] },
                  lastName: { type: 'string', enum: ["Lesley"] },
                  bandId: { type: 'number', enum: [4] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 1,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [1] },
                          type: { type: 'string', enum: ["piano"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                    ]
                  },
                }
              },
              {
                type: 'object',
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [10] },
                  firstName: { type: 'string', enum: ["Victoria"] },
                  lastName: { type: 'string', enum: ["Cremonesi"] },
                  bandId: { type: 'number', enum: [5] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 1,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [5] },
                          type: { type: 'string', enum: ["violin"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                    ]
                  },
                }
              },
              {
                type: 'object',
                required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt', 'Instruments'],
                properties: {
                  id: { type: 'number', enum: [3] },
                  firstName: { type: 'string', enum: ["Wilson"] },
                  lastName: { type: 'string', enum: ["Holt"] },
                  bandId: { type: 'number', enum: [1] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  Instruments: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 1,
                    items: [
                      {
                        type: 'object',
                        required: ['id', 'type', 'createdAt', 'updatedAt'],
                        properties: {
                          id: { type: 'number', enum: [6] },
                          type: { type: 'string', enum: ["cello"] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        }
                      },
                    ]
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
