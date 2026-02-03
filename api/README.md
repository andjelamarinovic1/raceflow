Commands

- Create migration:
  -- npx typeorm-ts-node-commonjs migration:generate ./src/database/migrations/{"----MigrationName----"} -d src/data-source.ts

- Run migration  
  -- npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
