# vehicle-telemetry 0.0.1

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
"SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in
this document are to be interpreted as described in RFC 2119.

## 1. Purpose

This specification attempts to create foundation for a standard for representing
data about a emergency apparatus locations in JSON.

## 2. File format

The vehicle-telemetry manifest files use the JSON format as described in RFC 4627.

Implementations MUST treat unknown keys as if they weren't present.
However, implementations MUST expose unknown key/values in their API
so that API users can optionally handle these keys. Implementations MUST
treat invalid values for keys as if they weren't present. If the key is
required, implementations MUST treat the entire vehicle-telemetry manifest file as invalid and refuse operation.
