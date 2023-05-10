const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Practica U-Tad - Express API with Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "This is a CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Javier Orti García",
          url: "https://github.com/javiortig",
          email: "javier.orti@live.u-tad.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            User: {
                type: "object",
                required: ["name", "age", "email", "password"],
                properties: {
                    name: {
                        type: "string",
                        example: "Menganito"
                    },
                    age: {
                        type: "integer",
                        example: 20
                    },
                    email: {
                        type: "string",
                        example: "whatever@gmail.com",
                        format: "email"
                    },
                    password: {
                        type: "string",
                        format: "password"
                    },
                    city: {
                        type: "string",
                        example: "Málaga"
                    },
                    accepts_offers: {
                      type: "boolean",
                      example: true
                    }
                },
            },
            Company: {
                type: "object",
                required: ["name", "cif", "address", "phone", "email"],
                properties: {
                    name: {
                        type: "string",
                        example: "Menganito"
                    },
                    cif: {
                        type: "string",
                        example: "W1364704E",
                        pattern: /^[A-HJNP-SUVE]{1}\d{7}[0-9A-J]{1}$/
                    },
                    email: {
                        type: "string",
                        example: "whatever@gmail.com",
                        format: "email"
                    },
                    address: {
                        type: "string",
                        example: "Calle Ortega y Gasset, 5, Málaga"
                    },
                    phone: {
                      type: "string",
                      example: "+34618290113"
                    }
                },
            },
            Webpage: {
                type: "object",
                required: ["city", "title", "summary"],
                properties: {
                    city: {
                      type: "string",
                      example: "Málaga"
                    },
                    title: {
                      type: "string",
                      example: "TGB Hamburguesería"
                    },
                    summary: {
                      type: "string",
                      example: "Hamburguesas en menos de 20 minutos de buena calidad"
                    }
                },
            },
            Review: {
                type: "object",
                required: ["score"],
                properties: {
                    score: {
                      type: "integer",
                      example: 1,
                      min: 0,
                      max: 5
                    },
                    content: {
                      type: "string",
                      example: "This place is awful. The burguers taste horrible."
                    },
                },
            },
            
        },
      },
    },
    apis: ["./routes/*.js"],
  };
  
module.exports = swaggerJsdoc(options)