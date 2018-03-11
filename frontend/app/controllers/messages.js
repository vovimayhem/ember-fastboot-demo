import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    postMessage(message) {
      // called when the "Send" button is clicked
      const store = this.get('store');
      let post = store.createRecord('post', { body: message });
      let displayedPosts = this.get('model');

      // => POST to '/posts'
      let promise = post.save();

      promise.then(posted => { displayedPosts.pushObject(posted); });

      return promise;
    }
  }
});
