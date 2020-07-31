
import 'mocha';
import request from "supertest";
import { expect } from 'chai';

import app from '../../src/app';

describe('Health endpoint', () => { 
    it('should return status code 200', async () => { 
        
        const response = await request(app).get('/');
        
        expect(response.status).equal(200);
  }); 
});