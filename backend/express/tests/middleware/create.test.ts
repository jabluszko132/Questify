import {expect} from 'chai';
import {describe, it} from 'mocha';
import {NextFunction, Request, Response} from 'express';
import {getCreateMiddleware} from '../../middleware/universalCrud';
import nock from 'nock';

describe('getCreateMiddleware', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;
    let middleware: ReturnType<typeof getCreateMiddleware>;
    let prismaSchema: { create: any };

    beforeEach(() => {
        req = { body: { name: 'Test Resource' } } as Request;
        res = {} as Response;
        next = (err?: any) => {};
    });

    it('should create a new resource and return a 201 status code', async () => {
        prismaSchema = {
            create: async (opts: any) => ({ id: 1, name: 'Test Resource' }),
        };
        middleware = getCreateMiddleware(prismaSchema);
        
        res = {
            status: function(code: number) {
                expect(code).to.equal(201);
                return this;
            },
            json: function(data: any) {
                expect(data).to.deep.equal({ id: 1, name: 'Test Resource' });
            }
        } as Response;
        next = (err?: any) => {
            expect(err).to.be.undefined;
        };

        middleware(req, res, next);
    });

    it('should call next with an error if prismaSchema.create fails', async () => {
        const error = new Error('Create failed');
        prismaSchema = {
            create: async () => {
                throw error;
            }
        };
        middleware = getCreateMiddleware(prismaSchema);
        next = (err?: any) => {
            expect(err).to.equal(error);
        };

        middleware(req, res, next);
    });

    it('should call next with an error if an exception is thrown', async () => {
        prismaSchema = {
            create: () => {
                throw new Error('Unexpected Error');
            }
        };
        middleware = getCreateMiddleware(prismaSchema);
        next = (err?: any) => {
            expect(err).to.be.instanceOf(Error);
            expect(err.message).to.equal('Unexpected Error');
        };

        middleware(req, res, next);
    });
});