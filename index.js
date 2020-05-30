const axios = require('axios');

class HashnodeDevblogSource {
  static defaultOptions() {
    return {
      username: '',
      typeName: 'DevblogPost',
    }
  }

  HASHNODE_API_URL = 'https://api.hashnode.com/';

  async getCuidsForAllPosts() {
    let query = `query{ user(username: "` + this.options.username + `") {publication {posts { cuid }}}}`;
    let { data } = await axios.post(this.HASHNODE_API_URL, {query: query});
    let publication = data.data.user.publication;

    if (!publication) {
      throw new Error('No publications found for this user.');
    }

    let posts = publication.posts;

    let allCuids = []
    for (let post of posts) {
      allCuids.push(post.cuid);
    }

    return allCuids;
  }

  getQueryForSinglePostDetail(cuid) {
    return cuid + `:` + `post(cuid: "` + cuid + `") { slug title type dateUpdated dateAdded contentMarkdown content brief coverImage tags { name }}`;
  }

  async getAllPostDetails(allCuids) {
    if (!allCuids.length) {
      console.warn('No posts found in the devblog.');
      return [];
    }

    let query = `query{`;

    for (let cuid of allCuids) {
      query += this.getQueryForSinglePostDetail(cuid);
    }

    query += '}';

    let { data } = await axios.post(this.HASHNODE_API_URL, {query: query});
    data = data.data;

    let posts = [];

    for (let postCuid in data) {
      posts.push(data[postCuid]);
    }

    return posts;
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

      const allCuids = await this.getCuidsForAllPosts();
      const posts = await this.getAllPostDetails(allCuids);

      for (let post of posts) {
        contentType.addNode(post);
      }
    });
  }
}

module.exports = HashnodeDevblogSource;
