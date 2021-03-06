---
id: sharing-npm-dependencies
title: Sharing NPM Dependencies
sidebar_label: Sharing NPM Dependencies
---

> The feature described in this guide is also demonstrated in the ["AMD Module
> Loader" demo][amd-module-loader-demo].

When using the [`@feature-hub/module-loader-amd`][module-loader-amd-api]
package, the integrator can provide shared npm dependencies to Feature Apps
using the `defineExternals` function:

```js
import {createFeatureHub} from '@feature-hub/core';
import {defineExternals, loadAmdModule} from '@feature-hub/module-loader-amd';
import * as React from 'react';
```

```js
defineExternals({react: React});

const {featureAppManager} = createFeatureHub('acme:integrator', {
  moduleLoader: loadAmdModule,
});
```

Feature Apps should define these externals in their build config. For example,
defining `react` as external in a webpack config would look like this:

```json
{
  "externals": {
    "react": "react"
  }
}
```

On the server, when Feature Apps are [bundled as CommonJS modules][serversrc],
the integrator either

1. needs to make sure that the externals are provided as node modules that can
   be loaded with `require()`, or

1. if the integrator code is bundled and no node modules are available during
   runtime, the integrator can provide shared npm dependencies to Feature Apps
   using the `createCommonJsModuleLoader` function of the
   [`@feature-hub/module-loader-commonjs`][module-loader-commonjs-api] package:

   ```js
   import {createFeatureHub} from '@feature-hub/core';
   import {createCommonJsModuleLoader} from '@feature-hub/module-loader-commonjs';
   import * as React from 'react';
   ```

   ```js
   const {featureAppManager} = createFeatureHub('acme:integrator', {
     moduleLoader: createCommonJsModuleLoader({react: React}),
   });
   ```

To validate the external dependencies that are [required by Feature
Apps][feature-app-dependencies] against the shared npm dependencies that are
provided by the integrator, [the `ExternalsValidator` can be
used][validating-externals].

[module-loader-amd-api]: /@feature-hub/modules/module_loader_amd.html
[module-loader-commonjs-api]: /@feature-hub/modules/module_loader_commonjs.html
[amd-module-loader-demo]:
  https://github.com/sinnerschrader/feature-hub/tree/master/packages/demos/src/module-loader-amd
[serversrc]: /docs/guides/integrating-the-feature-hub#serversrc
[feature-app-dependencies]: /docs/guides/writing-a-feature-app#dependencies
[validating-externals]:
  /docs/guides/integrating-the-feature-hub#validating-externals
