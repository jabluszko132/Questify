import {expect} from 'chai';
import {describe, it} from 'mocha';
import {getEntityValidationMiddleware} from '../middleware/entityValidationMiddleware';
import {NextFunction, Request, Response} from 'express';
import {z, ZodObject} from 'zod';
import nock from 'nock';

describe('Entity validation middleware', () => {
    it('should call next() when validation is successful', () => {
        const schema: ZodObject<any> = z.object({name: z.string()});
        const middleware = getEntityValidationMiddleware(schema);

        const req: Request = {body: {name: 'Test Name'}} as Request;
        const res: Response = {} as Response;
        const next: NextFunction = (err?: any) => {
            expect(err).to.be.undefined;
        };

        middleware(req, res, next);
    });

    it('should return 400 status with validation errors when validation fails', () => {
        const schema: ZodObject<any> = z.object({name: z.string()});
        const middleware = getEntityValidationMiddleware(schema);

        const req: Request = {body: {name: 123}} as Request;
        const res: Response = {
            status: (status: number): Response => {
                expect(status).to.equal(400);
                return res;
            },
            json: (data: { [key: string]: any }): void => {
                expect(data).to.have.property('400', 'Bad request');
                expect(data.errors).to.be.an('array');
            },
        } as Response;
        const next: NextFunction = (): void => {
            throw new Error('next() should not be called when validation fails');
        };

        middleware(req, res, next);
    });

    it('should call next(err) when an unexpected error occurs', () => {
        const schema: ZodObject<any> = z.object({name: z.string()});
        const middleware = getEntityValidationMiddleware(schema);

        const req: Request = null as unknown as Request;
        const res: Response = {} as Response;
        const next: NextFunction = (err?) => {
            expect(err).to.be.an.instanceOf(Error);
        };

        middleware(req, res, next);
    });

    it('should handle requests for validation success', () => {
        const schema: ZodObject<any> = z.object({name: z.string()});
        const middleware = getEntityValidationMiddleware(schema);

        nock('http://localhost')
            .post('/test', {name: 'Mocked Name'})
            .reply(200);

        const req: Request = {body: {name: 'Mocked Name'}} as Request;
        const res: Response = {} as Response;
        const next: NextFunction = (err?) => {
            expect(err).to.be.undefined;
        };

        middleware(req, res, next);
        nock.cleanAll();
    });

    it('should handle requests for validation failure', () => {
        const schema: ZodObject<any> = z.object({name: z.string()});
        const middleware = getEntityValidationMiddleware(schema);

        nock('http://localhost')
            .post('/test', {name: 123})
            .reply(400, {
                '400': 'Bad request',
                errors: [{message: 'Expected string, received number'}],
            });

        const req: Request = {body: {name: 123}} as Request;
        const res: Response = {
            status: (status: number): Response => {
                expect(status).to.equal(400);
                return res;
            },
            json: (data: { [key: string]: any }): void => {
                expect(data).to.have.property('400', 'Bad request');
                expect(data.errors).to.be.an('array');
            },
        } as Response;
        const next: NextFunction = (): never => {
            throw new Error('next() should not be called when validation fails');
        };

        middleware(req, res, next);
        nock.cleanAll();
    });
});