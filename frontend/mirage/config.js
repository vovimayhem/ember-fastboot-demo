export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  this.urlPrefix = 'http://backend.example.com'


  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.get('/posts', () => {
    return {
      data:[
        {
          id : "1",
          type : "post",
          attributes : {
            body : "Test Post Body",
            "created-at" : "2018-04-09T19:49:26.713Z",
            "updated-at" : "2018-04-09T19:49:26.713Z"
          },
          relationships : {
            author : {
              data : {
                id : "1",
                type : "user"
              }
            }
          }
        }
      ],
      included : [
        {
          id : "1",
          type : "user",
          attributes : {
            username : "vovimayhem"
          }
        }
      ],
      links : {
        first : "http://backend.example.com/posts?include=author\u0026page%5Blimit%5D=100\u0026page%5Boffset%5D=0",
        self  : "http://backend.example.com/posts?include=author",
        last  : "http://backend.example.com/posts?include=author\u0026page%5Blimit%5D=100\u0026page%5Boffset%5D=0"
      },
      jsonapi : {
        version : "1.0"
      }
    };
  });
}
