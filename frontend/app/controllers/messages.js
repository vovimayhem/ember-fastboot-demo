import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async postMessage(message) {
      // called when the "Send" button is clicked
      let post = this.store.createRecord('post', { body: message });
      let displayedPosts = this.model;
      const result = await post.save();
      displayedPosts.pushObject(post);
      return result;
    }
  }
});
