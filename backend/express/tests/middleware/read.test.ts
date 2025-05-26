import {NextFunction, Request, Response} from "express";
import {expect} from "chai";
import {describe, it} from "mocha";
import {getReadByIdParamMiddleware} from "../../middleware/universalCrud";

describe("getReadByIdParamMiddleware", () => {
    const mockPrisma = {
        findUnique: async (): Promise<null | Record<string, any>> => null,
    };

    const mockRequest = (params: Record<string, any>): Partial<Request> => ({
        params,
    });

    interface MockResponse extends Partial<Response> {
        data?: any;
        statusCode?: number;
    }

    const mockResponse = (): MockResponse => {
        const res: MockResponse = {};
        res.status = function (status: number): Response {
            res.statusCode = status;
            return res as Response;
        };
        res.json = function (data: any): Response {
            res.data = data;
            return res as Response;
        };
        res.end = function (chunk?: any, encoding?: BufferEncoding | (() => void), cb?: () => void): Response {
            if (typeof chunk === 'string') {
                res.data = chunk;
            }
            return res as Response;
        };
        return res;
    };

    interface MockNextFunction {
        (error?: Error | unknown): void;
        called: boolean | Error | unknown;
    }

    const mockNext = ((error?: Error | unknown): void => {
        (mockNext as MockNextFunction).called = error || true;
    }) as MockNextFunction;

    let req: Partial<Request>;
    let res: MockResponse;
    let middleware: ReturnType<typeof getReadByIdParamMiddleware>;

    beforeEach(() => {
        (mockNext as MockNextFunction).called = false as boolean | Error | unknown;
        req = mockRequest({});
        res = mockResponse();
        middleware = getReadByIdParamMiddleware("id", mockPrisma);
    });

    it("should return 400 if id is missing in params", async () => {
        middleware(req as Request, res as Response, mockNext as NextFunction);

        expect(res.statusCode).to.equal(400);
        expect(res.data).to.equal("Bad request");
    });

    it("should return 404 if record is not found", async () => {
        mockPrisma.findUnique = async (): Promise<null> => null;
        req = mockRequest({id: "1"});

        await middleware(req as Request, res as Response, mockNext as NextFunction);

        expect(res.statusCode).to.equal(404);
        expect(res.data).to.eql({"404": "Not found"});
    });

    it("should return 200 and the result if record is found", async () => {
        const mockRecord: Record<string, any> = {id: 1, name: "Test"};
        mockPrisma.findUnique = async (): Promise<Record<string, any>> => mockRecord;
        req = mockRequest({id: "1"});

        await middleware(req as Request, res as Response, mockNext as NextFunction);

        expect(res.statusCode).to.equal(200);
        expect(res.data).to.eql(mockRecord);
    });

    it("should call next with error if prisma throws an error", async () => {
        const mockError: Error = new Error("Database Error");
        mockPrisma.findUnique = async (): Promise<never> => {
            throw mockError;
        };
        req = mockRequest({id: "1"});

        await new Promise<void>((resolve) => {
            middleware(req as Request, res as Response, (error?: Error | unknown) => {
                expect(error).to.equal(mockError);
                resolve();
            });
        });
    });
});