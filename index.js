const fire = require('./schemas/fire-incident/schemas/0.0.1/schema.json');
const fireMapping = require('./schemas/fire-incident/schemas/0.0.1/mapping.json');
const vehicleTelemetry = require('./schemas/vehicle-telemetry/schemas/0.0.1/schema.json');
const vehicleTelemetryMapping = require('./schemas/vehicle-telemetry/schemas/0.0.1/mapping.json');

const schemas = {
  fire,
  vehicleTelemetry,
};

const mappings = {
  fire: fireMapping,
  vehicleTelemetry: vehicleTelemetryMapping,
}

const templates = {
  ['fire-incident']: require('./schemas/fire-incident/schemas/0.0.1/template.json'),
  ['apparatus-fire-incident']: require('./schemas/apparatus-fire-incident/schemas/0.0.1/template.json'),
  ['kibana']: require('./schemas/kibana/schemas/0.0.1/template.json'),
}

module.exports = {
  schemas,
  mappings,
  templates,
};
