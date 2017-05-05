# hangman-server

### Introduction

The software is a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)-based 
back-end solution to store and manage multi-player data states for any number of
appropriate front-end implementations of the [Hangman](https://en.wikipedia.org/wiki/Hangman_(game))
game.  The design of the server assumes that user interface consists of pure 
components whose only facilitation is to manifest the received data visually.
Mutation of the data is delegated to a front- or back-end infrastructure, which,
in turn, should return the adjusted data back to the client.

`hangman-server` manages a game state using a [Redux](http://redux.js.org/)-based
architecture.  The implementation combines the most recent data history with new 
user-sent information to generate a new game state.  The state is then saved and 
sent to the browser for a visual update.  Construction of a user interface thus 
has only two foci: movement of data to and from the server and linkage of data 
to their respective elements.  [hangman-client-jquery](https://github.com/aptivator/hangman-client-jquery)
and [hangman-client-react]() (*coming soon*) projects provide examples of pure 
component-based user interface arrangements.

### Configuration

`hangman-server` was built to run in development and production environments.
Configurations for one or both should be specified in the `package.json` using
the following criteria:

* **host** - sets the server's hostname (e.g., `localhost`, `127.0.0.1`)
* **port** - designates the server's port
* **path** - specifies the name of the directory with front-end application files
  (the path should be specified relative to the directory where `package.json` 
  is located)
* **cors** - directs (when `true`) to allow cross-origin requests
* **secure** - indicates (when `true`) whether a session cookie is to be sent
  over secure connection
* **inactiveTime** - tells server to wait a number of milliseconds of continuous
  client inactivity before deleting game data

Here is an example from this repository's `package.json`.

```json
{
  "hangman-server": {
    "development": {
      "path": "test/helpers",
      "host": "localhost",
      "inactiveTime": 600000,
      "port": 12345,
      "cors": false,
      "secure": false
    },
    "production": {
      "inactiveTime": 600000,
      "cors": true
    }
  }  
}
```

### Deployment Options

The software can be deployed as **standalone** or as a **client dependency**.

**Standalone** deployment is a [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
service that only accepts `POST` requests (that are specified below) and does
not serve a front-end game-playing application.  When deploying a REST-only 
service, `cors` configuration flag must be set to `true` to allow requests from
external domains.  When running `hangman-server` by itself, session management 
is disabled by default.  Modern browsers block third-party cookies and to keep 
track of game state, client application's REST calls must include a unique `id`
in their body.  [uuid](https://www.npmjs.com/package/uuid) utility may be a good
resource to generate distinct identifiers.

An important caveat with standalone deployment is that many common ajax utilities
such as [$.ajax](http://api.jquery.com/jquery.ajax/) and native [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
may not deliver client data to the server.  In those cases a [superagent](https://visionmedia.github.io/superagent/)
library is recommended.

An example of standalone `hangman-server` deployment may be access through the
following [Heroku](https://www.heroku.com/) instance: https://guarded-cliffs-93737.herokuapp.com.  

**Client dependency** deployment specifies, installs, and configures 
`hangman-server` as its dependency.  In this setup the service will also handle
`GET` requests for a game-playing application.  Coupling client and server
may preclude the need for `cors: true` flag and front-end `REST` calls can be 
made without augmenting their data with a unique `id`.  With `cors` inactive,
`hangman-server` will rely on session identifiers to keep tack of game states.

### Deploying as Standalone

#### Installation

```
git clone https://git.heroku.com/guarded-cliffs-93737.git hangman-server
```

#### Startup

```
node ./dist/server
```

### Deploying as Client Dependency

#### Installation

```
npm install --save hangman-server
```

#### Startup

```
node ./node_modules/hangman-server/dist/server
```

### Deployment Examples

For complete `CORS` service and same-origin deployment examples, the following
projects are available: [hangman-client-jquery](https://github.com/aptivator/hangman-client-jquery) 
and [hangman-client-react]() (*coming soon*), respectively.

### REST POST Endpoints

#### /new

Starts a new game by creating a blank game state.  If there is an unfinished game,
a call to `/new` will reset it.  **Expects** no data or `{id: 'some unique id'}`
when interacting with `CORS` service.  **Returns** a blank game object.

#### /play

Receives a user's letter guess and modifies an existing game state.  `/play` should
be called after `/new`.  If `/play` is called first, the request will be redirected
to `/new`.  If `/play` is called after a game is completed, a redirect to `/new` 
will also be made.  **Expects** letter object (e.g., `{letter: 'a'}`) with `id`
when `POST`ing to `CORS` server (e.g., `{letter: 'a', id: 'some uuid'}`).
**Returns** an up-to-date game object.

#### Game State Data Object

The endpoints return an object with the following properties:

* **id** - a unique client-generated identifier (necessary only when placing 
  calls with `CORS` service)
* **correct** - success (`true`) or failure (`false`) of the most recent letter 
  guess
* **missed** - number of missed guesses (when 6, the game is lost)
* **used** - an array of ascendingly sorted letters that were already utilized
* **won** - game success (`true`) or failure (`false`) (or `null` when a game is
  ongoing)
* **word** - an array of correct letters at their proper locations with
  respect to a word that is being guessed (missing letters are sent as `null`s)

### Conclusion

`hangman-server` was written as a technical exercise and a technology demonstrator.
Deeper exploration of such issues as scalability, security, and performance are
therefore deferred for future `hangman` projects. 
