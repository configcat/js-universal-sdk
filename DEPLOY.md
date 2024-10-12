# How to deploy

## Before deployment

Make sure the CI is running: https://github.com/configcat/js-universal-sdk/actions/workflows/js-sdk-ci.yml

## Via shell script

1. Run `./deploy.sh`

2. Add release notes: https://github.com/configcat/js-universal-sdk/releases

2. Update `@configcat/sdk` in [`react-sdk`](https://github.com/configcat/react-sdk/) and re-deploy the package.

3. Test all packages manually!

### or

## Manually
1. Run tests
   ```PowerShell
    npm test
   ```

1. Create a new version (patch, minor, major)
Increase version number by using `npm version patch | minor | major`

    *Example: increasing patch version* 
    ```PowerShell
    npm version patch
    ```

1. Push tag to remote
    
    If you tag the commit, a GitHub action automatically publishes the package to NPM. 
    ```PowerShell
    git push origin <new version>
    ```
    *Example: git push origin v1.1.15*

    You can follow the build status [here](https://github.com/configcat/js-universal-sdk/actions/workflows/js-sdk-ci.yml).

2. Add release notes: https://github.com/configcat/js-universal-sdk/releases
2. Update `@configcat/sdk` in [`react-sdk`](https://github.com/configcat/react-sdk/) and re-deploy the package.
3. Test all packages manually!
