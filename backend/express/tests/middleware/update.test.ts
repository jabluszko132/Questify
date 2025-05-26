import { expect } from 'chai';
import { getUpdateByParamIdMiddleware } from '../../middleware/universalCrud/update';
import { Request, Response, NextFunction } from 'express';

describe('getUpdateByParamIdMiddleware', () => {
    let called: any;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let nextCalled: any;

    beforeEach(() => {
        called = {};
        req = { params: {}, body: {} };
        res = {
            status(code: number) {
                called.status = code;
                return this;
            },
            json(data: any) {
                called.json = data;
                return this;
            },
            end(msg?: any) {
                called.end = msg;
                return this;
            }
        } as Partial<Response>;
        nextCalled = undefined;
    });

    it('returns 400 if idName not in req.params', async () => {
        const prismaMock = { update: () => Promise.resolve({}) };
        const middleware = getUpdateByParamIdMiddleware('id', prismaMock, true);

        await middleware(req as Request, res as Response, (err) => { nextCalled = err; });

        expect(called.status).to.equal(400);
        expect(called.end).to.equal('Bad request');
        expect(nextCalled).to.be.undefined;
    });

    it('returns updated object on success', async () => {
        let updateArgs: any;
        const updatedData = { id: '123', name: 'Nowa nazwa' };
        const prismaMock = {
            update(args: any) {
                updateArgs = args;
                return Promise.resolve(updatedData);
            }
        };
        req.params = { id: '123' };
        req.body = { name: 'Nowa nazwa' };
        const middleware = getUpdateByParamIdMiddleware('id', prismaMock, true);

        await middleware(req as Request, res as Response, (err) => { nextCalled = err; });

        expect(updateArgs).to.deep.equal({
            where: { id: '123' },
            data: { name: 'Nowa nazwa' }
        });
        expect(called.status).to.equal(200);
        expect(called.json).to.deep.equal(updatedData);
        expect(nextCalled).to.be.undefined;
    });

    it('returns 404 if no record found', async () => {
        const prismaMock = {
            update: () => Promise.resolve(null)
        };
        req.params = { id: '123' };
        req.body = { name: 'Nowa nazwa' };
        const middleware = getUpdateByParamIdMiddleware('id', prismaMock, true);

        await middleware(req as Request, res as Response, (err) => { nextCalled = err; });

        expect(called.status).to.equal(404);
        expect(called.json).to.deep.equal({ "404": "Not found" });
        expect(nextCalled).to.be.undefined;
    });

    it('calls next with error on unexpected error', async () => {
        const prismaMock = {
            update: () => { throw new Error('Unexpected error'); }
        };
        req.params = { id: '123' };
        req.body = { name: 'Nowa nazwa' };
        const middleware = getUpdateByParamIdMiddleware('id', prismaMock, true);

        await middleware(req as Request, res as Response, (err) => { nextCalled = err; });

        expect(called.status).to.equal(500);
        expect(nextCalled).to.be.an.instanceOf(Error);
        expect(nextCalled.message).to.equal('Unexpected error');
    });
});