import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const posts = await this.store.query('post', { include: 'author' });
    return posts.toArray();
  }
});
