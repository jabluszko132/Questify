import {expect} from "chai";
import {describe, it} from "mocha";
import {getDeleteByIdParamMiddleware} from "../../middleware/universalCrud";
import {NextFunction, Request, Response} from "express";

describe("getDeleteByIdParamMiddleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let mockPrismaSchema: { delete: any };

    beforeEach(() => {
        req = {params: {}};
        res = {
            status: function (code: number) {
                return this;
            },
            json: function (body: any) {
                return this;
            },
            end: function () {
                return this;
            },
        } as Response;
        next = function () {
        } as NextFunction;

        mockPrismaSchema = {
            delete: async () => ({}),
        };
    });

    it("should return 400 if idName is not in params", (done) => {
        const middleware = getDeleteByIdParamMiddleware("id", mockPrismaSchema);

        res.status = (code: number) => {
            expect(code).to.equal(400);
            return res as Response;
        };

        res.end = (message: any) => {
            expect(message).to.equal("Bad request");
            done();
            return res as Response;
        };

        middleware(req as Request, res as Response, next);
    });

    it("should call prismaSchema.delete with parsed ID", async () => {
        const middleware = getDeleteByIdParamMiddleware("id", mockPrismaSchema, false);
        req.params = {id: "123"};

        mockPrismaSchema.delete = async (args: any) => {
            expect(args).to.deep.equal({where: {id: 123}});
            return {message: "Deleted successfully"};
        };

        res.status = (code: number) => {
            expect(code).to.equal(200);
            return res as Response;
        };

        res.json = (result: any) => {
            expect(result).to.deep.equal({message: "Deleted successfully"});
            return res as Response;
        };

        middleware(req as Request, res as Response, next);
    });

    it("should call prismaSchema.delete with string ID if isString is true", async () => {
        const middleware = getDeleteByIdParamMiddleware("id", mockPrismaSchema, true);
        req.params = {id: "abc"};

        mockPrismaSchema.delete = async (args: any) => {
            expect(args).to.deep.equal({where: {id: "abc"}});
            return {message: "Deleted successfully"};
        };

        res.status = (code: number) => {
            expect(code).to.equal(200);
            return res as Response;
        };

        res.json = (result: any) => {
            expect(result).to.deep.equal({message: "Deleted successfully"});
            return res as Response;
        };

        middleware(req as Request, res as Response, next);
    });

    it("should call next with an error if prismaSchema.delete rejects", async () => {
        const middleware = getDeleteByIdParamMiddleware("id", mockPrismaSchema);
        req.params = {id: "123"};

        mockPrismaSchema.delete = async () => {
            throw new Error("Prisma delete error");
        };

        next = (err: any) => {
            expect(err).to.be.instanceOf(Error);
            expect(err.message).to.equal("Prisma delete error");
        };

        middleware(req as Request, res as Response, next);
    });

    it("should call next with an error if an exception is thrown", async () => {
        const middleware = getDeleteByIdParamMiddleware("id", mockPrismaSchema);
        req.params = {id: "test"};

        mockPrismaSchema.delete = () => {
            throw new Error("Unexpected error");
        };

        next = (err: any) => {
            expect(err).to.be.instanceOf(Error);
            expect(err.message).to.equal("Unexpected error");
        };

        middleware(req as Request, res as Response, next);
    });
});