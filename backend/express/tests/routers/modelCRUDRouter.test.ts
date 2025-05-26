// modelCRUDRouter.test.ts
import {expect} from "chai";
import express from "express";
import request from "supertest";
import {z} from "zod";
import {CRUDRouterConfig, default as getModelCRUDRouter} from "./modelCRUDRouter";
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


    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use("/model", getModelCRUDRouter(prismaMock, config));

    it("should create an entity on POST /", async () => {
        const res = await request(app).post("/model").send({name: "Test Entity", id: 1});
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("name", "Test Entity");
    });

    it("should fetch an entity on GET /:id", async () => {
        const res = await request(app).get("/model/1");
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", 1);
    });

    it("should return 404 for non-existing entity on GET /:id", async () => {
        const res = await request(app).get("/model/nonexistent");
        expect(res.status).to.equal(404);
    });

    it("should update an entity on PATCH /:id", async () => {
        const res = await request(app).patch("/model/1").send({name: "Updated Entity"});
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("name", "Updated Entity");
        expect(res.body).to.have.property("id", 1);
    });

    it("should delete an entity on DELETE /:id", async () => {
        const res = await request(app).delete("/model/1");
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", 1);
    });
});