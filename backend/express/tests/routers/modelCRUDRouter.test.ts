// modelCRUDRouter.test.ts
import {expect} from "chai";
import express from "express";
import nock from "nock";
import {z} from "zod";
import {CRUDRouterConfig, default as getModelCRUDRouter} from "../../routers/modelCRUDRouter";
import {it, describe} from "mocha";

describe("getModelCRUDRouter", () => {

    const config: CRUDRouterConfig = {
        idName: "id",
        createModel: z.object({name: z.string()}),
        updateModel: z.object({name: z.string().optional()}),
    };

    // Mock dependencies
    const prismaMock = {
        create: async (opts: any) => opts.data,
        findUnique: async (opts: any) => {
            const id = opts.where.id;
            return id === 1 ? {id: 1} : null;
        },
        update: async (opts: any) => ({
            ...opts.data,
            id: opts.where.id,
        }),
        delete: async (opts: any) => ({
            id: opts.where.id,
        }),
    };

    const baseUrl = 'http://localhost';
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use("/model", getModelCRUDRouter(prismaMock, config));

    beforeEach(() => {
        nock.cleanAll();
    });

    it("should create an entity on POST /", async () => {
        const scope = nock(baseUrl)
            .post('/model', {name: "Test Entity", id: 1})
            .reply(201, {name: "Test Entity"});

        const response = await fetch(`${baseUrl}/model`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: "Test Entity", id: 1})
        });
        expect(response.status).to.equal(201);
        const body = await response.json();
        expect(body).to.have.property("name", "Test Entity");
        scope.done();
    });

    it("should fetch an entity on GET /:id", async () => {
        const scope = nock(baseUrl)
            .get('/model/1')
            .reply(200, {id: 1});

        const response = await fetch(`${baseUrl}/model/1`);
        expect(response.status).to.equal(200);
        const body = await response.json();
        expect(body).to.have.property("id", 1);
        scope.done();
    });

    it("should return 404 for non-existing entity on GET /:id", async () => {
        const scope = nock(baseUrl)
            .get('/model/nonexistent')
            .reply(404);

        const response = await fetch(`${baseUrl}/model/nonexistent`);
        expect(response.status).to.equal(404);
        scope.done();
    });

    it("should update an entity on PATCH /:id", async () => {
        const scope = nock(baseUrl)
            .patch('/model/1', {name: "Updated Entity"})
            .reply(200, {name: "Updated Entity", id: 1});

        const response = await fetch(`${baseUrl}/model/1`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: "Updated Entity"})
        });
        expect(response.status).to.equal(200);
        const body = await response.json();
        expect(body).to.have.property("name", "Updated Entity");
        expect(body).to.have.property("id", 1);
        scope.done();
    });

    it("should delete an entity on DELETE /:id", async () => {
        const scope = nock(baseUrl)
            .delete('/model/1')
            .reply(200, {id: 1});

        const response = await fetch(`${baseUrl}/model/1`, {
            method: 'DELETE'
        });
        expect(response.status).to.equal(200);
        const body = await response.json();
        expect(body).to.have.property("id", 1);
        scope.done();
    });
});