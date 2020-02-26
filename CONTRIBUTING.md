# Contribution guidelines

1. Create a new branch with the name of your proposal:
    - If you're already a collaborator, prefer to create a `fix/*`, `feat/*` or `docs/*` branch on official repository;
    - If you're not a collaborator yet, fork the repository and create the branch;

2. Clone and setup the monorepo:
```bash
git clone git@github.com:{user}/storefront.git
cd storefront
npm i
```

3. Edit source files and test changes locally with `npm run serve`;

4. Commit following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/);

5. Ensure you're respecting [JavaScript Standard Style](https://standardjs.com/) and [Vue Style Guide](https://vuejs.org/v2/style-guide/);

6. Open a new [PR](https://github.com/ecomplus/storefront/pulls) to _master_ (latest version) or _v*-dev_ branch;

7. Congrats! Just wait a little for our review and merge.

You may want to check TODOs on [open issues](https://github.com/ecomplus/storefront/issues) (not assigned).

Thanks in advance :smile:
