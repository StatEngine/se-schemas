import 'babel-polyfill';
import { expect } from 'chai';
import Ajv from 'ajv';
import moment from 'moment';

import lib from '../../index';
console.dir(lib)
const fireIncidentSchema = lib.schemas.fire;

describe('Schema ', () => {
  describe('Fire Incident Schema', () => {
    it('should allow null values in description.event_closed', () => {
      const validator = new Ajv({ allErrors: true });

      const incident = {
        fire_department: {
          fd_id: '12345',
          firecares_id: '1245',
          name: 'Test',
          state: 'VA',
          timezone: 'US/Eastern',
        },
        description: {
          event_opened: moment.utc().format(),
          event_closed: null,
          type: 'A'
        },
        address: {
          address_line1: '123 Maple Street',
          state: 'VA',
        },
        apparatus: [],
        version: '0.0.1'
      };

      const valid = validator.validate(fireIncidentSchema, incident);
      expect(valid).to.be.true;
    });

    it('should throw error when location value is wrong type', () => {
      const validator = new Ajv({ allErrors: true });

      const incident = {
        fire_department: {
          fd_id: '12345',
          firecares_id: '1245',
          name: 'Test',
          state: 'VA',
          timezone: 'US/Eastern',
        },
        description: {
          event_opened: moment.utc().format(),
          event_closed: null,
          type: 'A'
        },
        address: {
          address_line1: '123 Maple Street',
          state: 'VA',
          location: {
            parcel: {
              dwelling_value: '3'
            }
          }
        },
        apparatus: [],
        version: '0.0.1'
      };

      const valid = validator.validate(fireIncidentSchema, incident);
      expect(validator.errorsText()).to.equal('data.address.location.parcel.dwelling_value should be number');
    });
  });
});
