declare module "json-schema-to-openapi-schema" {
  function convertSchema(schema: Record<string, any>): Record<string, any>;
  export default convertSchema;
}