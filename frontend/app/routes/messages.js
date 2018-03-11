import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').query('post', { include: 'author' }).then(posts => posts.toArray());
  }
});
