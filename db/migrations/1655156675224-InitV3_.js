module.exports = class InitV3_1655156675224 {
  name = 'InitV3_1655156675224'

  async up(db) {
    await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "block_number" integer, "extrinsic_hash" text, "to_id" character varying, "from_id" character varying NOT NULL, "amount" numeric, "success" boolean, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_d6624eacc30144ea97915fe846" ON "transfer" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
    await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
    await db.query(`CREATE INDEX "IDX_d0b7149e0dea3bfc1ffa8742a2" ON "transfer" ("success") `)
    await db.query(`CREATE TABLE "account_transfer" ("id" character varying NOT NULL, "direction" character varying(4), "transfer_id" character varying, "account_id" character varying NOT NULL, CONSTRAINT "PK_3b959a286b97fc83be6cec239a9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_2c2313461bd6c19983900ef539" ON "account_transfer" ("transfer_id") `)
    await db.query(`CREATE INDEX "IDX_d5240d17696e229585da974641" ON "account_transfer" ("account_id") `)
    await db.query(`CREATE TABLE "reward" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "block_number" integer, "extrinsic_hash" text, "account_id" character varying NOT NULL, "amount" numeric, "round" integer, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_4b93a54e522c1bc423507342ec" ON "reward" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_51b4a3885904fbbc1296944ca4" ON "reward" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_4a8843fdb7840bfd00f8e4f7b3" ON "reward" ("account_id") `)
    await db.query(`CREATE TABLE "bond" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "block_number" integer, "extrinsic_hash" text, "account_id" character varying NOT NULL, "amount" numeric, "success" boolean, "type" character varying(6), "candidate" text, CONSTRAINT "PK_2a4d050cae7f0326222053ae2b4" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_b3ec1c99bd71224c6ef11cf5b0" ON "bond" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_838b5fd70c926e7d7c5bcb56ee" ON "bond" ("extrinsic_hash") `)
    await db.query(`CREATE INDEX "IDX_380e0ca8c041bf10c97b66b184" ON "bond" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_0bd97db4e1e32b00a831351680" ON "bond" ("success") `)
    await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "active_bond" numeric NOT NULL, "total_reward" numeric NOT NULL, "last_update_block" integer NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "round" ("id" character varying NOT NULL, "index" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "started_at" integer NOT NULL, "ended_at" integer, "collators_count" integer NOT NULL, "total" numeric NOT NULL, CONSTRAINT "PK_34bd959f3f4a90eb86e4ae24d2d" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_2c2313461bd6c19983900ef539c" FOREIGN KEY ("transfer_id") REFERENCES "transfer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "account_transfer" ADD CONSTRAINT "FK_d5240d17696e229585da974641a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "bond" ADD CONSTRAINT "FK_380e0ca8c041bf10c97b66b184b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "transfer"`)
    await db.query(`DROP INDEX "public"."IDX_d6624eacc30144ea97915fe846"`)
    await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
    await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
    await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
    await db.query(`DROP INDEX "public"."IDX_d0b7149e0dea3bfc1ffa8742a2"`)
    await db.query(`DROP TABLE "account_transfer"`)
    await db.query(`DROP INDEX "public"."IDX_2c2313461bd6c19983900ef539"`)
    await db.query(`DROP INDEX "public"."IDX_d5240d17696e229585da974641"`)
    await db.query(`DROP TABLE "reward"`)
    await db.query(`DROP INDEX "public"."IDX_4b93a54e522c1bc423507342ec"`)
    await db.query(`DROP INDEX "public"."IDX_51b4a3885904fbbc1296944ca4"`)
    await db.query(`DROP INDEX "public"."IDX_4a8843fdb7840bfd00f8e4f7b3"`)
    await db.query(`DROP TABLE "bond"`)
    await db.query(`DROP INDEX "public"."IDX_b3ec1c99bd71224c6ef11cf5b0"`)
    await db.query(`DROP INDEX "public"."IDX_838b5fd70c926e7d7c5bcb56ee"`)
    await db.query(`DROP INDEX "public"."IDX_380e0ca8c041bf10c97b66b184"`)
    await db.query(`DROP INDEX "public"."IDX_0bd97db4e1e32b00a831351680"`)
    await db.query(`DROP TABLE "account"`)
    await db.query(`DROP TABLE "round"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
    await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_2c2313461bd6c19983900ef539c"`)
    await db.query(`ALTER TABLE "account_transfer" DROP CONSTRAINT "FK_d5240d17696e229585da974641a"`)
    await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36"`)
    await db.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_380e0ca8c041bf10c97b66b184b"`)
  }
}