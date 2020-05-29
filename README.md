
<p align="center">
    <a href="https://www.npmjs.com/package/gridsome-plugin-pwa">
      <img src="https://gridsome.org/logos/logo-circle-light.svg" alt="gridsome logo" width="100px"/>
    </a>
    <h1 align="center">gridsome-source-hashnode-devblog</h1>
    <p align="center">
     Gridsome plugin to retrieve blog posts from your <a href = "https://hashnode.com/devblog">devblog</a> on <a href = "https://hashnode.com/">hashnode</a>. </p>
    <p align="center"><a href="https://npmjs.com/package/gridsome-source-hashnode-devblog"><img src="https://badge.fury.io/js/gridsome-source-hashnode-devblog.svg" alt="npm version"></a><img alt="npm" src="https://img.shields.io/npm/dt/gridsome-source-hashnode-devblog"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"><img src="https://badgen.net/github/license/nishantwrp/gridsome-source-hashnode-devblog"><img src="https://img.shields.io/david/nishantwrp/gridsome-source-hashnode-devblog"></p>
</p>

## Installation

```
# For npm
$ npm install gridsome-source-hashnode-devblog
# For yarn
$ yarn add gridsome-source-hashnode-devblog
```

## Usage

Add `gridsome-source-hashnode-devblog` to plugin array with following configurable options to `gridsome.config.js`

```js
module.exports = {
  plugins: [
    {
      use:  'gridsome-source-hashnode-devblog',
      options: {
        username:  '', // Your username on hashnode
        typeName:  'HashnodeDevblog' // Optional
      }
    }
  ]
}
```

## Example Query
```
query {
  allHashnodeDevblog {
    edges {
      node {
        title
        slug
        type
        dateAdded
        contentMarkdown
        content
        brief
        coverImage
        tags {
          name
        }
        dateUpdated
      }
    }
  }
}
```

## License (MIT)

Open [LICENSE](./LICENSE) file for more info
