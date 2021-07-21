# Estimated time spent working on the project

**Total estimated time = ~40h**

### MVP requirements analysis - ~6h
  - Involved entities and data structure.
  - Required endpoints to expose data.
  - Architecture analysis and module hierarchy.
  - Technology decisions.

### Project bootstrapping - ~5h
  - Project configuration (npm, eslint, prettier, jest, docker).
  - Required modules to have an Express server running.
  - Required modules to have a minimal ping endpoint.

### Endpoint to list criteria - ~8h
  - Criteria models and seeds.
  - Prepare integration modules to connect to MongoDb.
  - Required modules to mount `GET /v1/criterias`.

### Endpoint to list user's selected criteria - ~5h
  - SelectedCriteria models and seeds.
  - Required modules to mount `GET /v1/users/me/selected-criterias`.

### Endpoint to update a user's selected criteria - ~3h
  - Required modules to mount `PATCH /v1/users/me/selected-criterias/:selectedCriteriaUuid`.

### Endpoint to list startup's criteria compliances - ~3h
  - CriteriaCompliance models and seeds.
  - Required modules to mount `GET /v1/startups/:startupUuid/criteria-compliances`.

### Endpoint to update a criteria compliance - ~2h
  - Required modules to mount `PATCH /v1/criteria-compliances/:criteriaComplianceUuid`.

### Endpoint to list user's matchings ~5h
  - Matching models and seeds.
  - Required modules to mount `GET /v1/startups/:startupUuid/criteria-compliances`.

### Endpoint to update a user's matching ~2h
  - Required modules to mount `PATCH /v1/users/me/matchings/:matchingUuid`.
