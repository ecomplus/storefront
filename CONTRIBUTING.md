# Contribution guidelines

1. You may want to check TODOs on [open issues](https://github.com/ecomplus/storefront/issues) (not assigned).

2. Create a new branch with the name of your proposal:
    - If you're already a collaborator, prefer to create a `fix/*`, `feat/*` or `docs/*` branch on official repository;
    - If you're not a collaborator yet, fork the repository and create the branch;

3. Clone and setup the monorepo:
```bash
git clone git@github.com:{user}/storefront.git
cd storefront
npm i
```

4. Edit source files and test changes locally:
    - `npm run serve` to serve the entire template;
    - `lerna run --scope=@ecomplus/{pkg} serve` to call specific tests for some widget or UI package;
    - You may also want to edit test files at `@ecomplus/{pkg}/__tests__/` folder;

5. Commit following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/);

6. Ensure you're respecting [JavaScript Standard Style](https://standardjs.com/) and [Vue Style Guide](https://vuejs.org/v2/style-guide/);

7. Open a new [PR](https://github.com/ecomplus/storefront/pulls) to _master_ (latest version) or _v*-dev_ branch;

8. Congrats! Just wait a little for our review and merge.

**Thanks in advance** :smile:
