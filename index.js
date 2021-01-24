const axios = require('axios');

class HashnodeDevblogSource {
  static defaultOptions() {
    return {
      username: '',
      typeName: 'DevblogPost',
    }
  }

  HASHNODE_API_URL = 'https://api.hashnode.com/';

  async getAllPosts() {
    let query = `query { user(username: "` + this.options.username + `") { publication { posts { cuid slug title type dateUpdated dateAdded contentMarkdown brief coverImage tags { name }}}}}`;
    let { data } = await axios.post(this.HASHNODE_API_URL, {query: query});
    let publication = data.data.user.publication;

    if (!publication) {
      throw new Error('No publications found for this user.');
    }

    return publication.posts;
  }

  constructor(api, options = HashnodeDevblogSource.defaultOptions()) {
    this.options = options;

    if (!this.options.username) {
      throw new Error('Missing username option.')
    }

    api.loadSource(async store => {
      const contentType = store.addCollection({
        typeName: this.options.typeName
      });

      const posts = await this.getAllPosts();

      for (let post of posts) {
        contentType.addNode(post);
      }
    });
  }
}

module.exports = HashnodeDevblogSource;
