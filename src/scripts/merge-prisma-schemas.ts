import fs from "fs";
import path from "path";
import convertSchema from "json-schema-to-openapi-schema";

const jsonSchema = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/generated/client/json-schema.json"), "utf-8")
);

const openApiSchema = convertSchema(jsonSchema);

const swaggerPath = path.join(process.cwd(), "src/generated/swagger.json");
const swagger = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

swagger.components = swagger.components || {};
swagger.components.schemas = {
  ...swagger.components.schemas,
  ...openApiSchema.definitions,
};

fs.writeFileSync(swaggerPath, JSON.stringify(swagger, null, 2));
console.log("✅ Prisma schemas merged into swagger.json");