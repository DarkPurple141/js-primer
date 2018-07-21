/*

Promises are one way to deal with async JavaScript

Essentially, a promise will wait until an async operation
resolves (or is rejected), before continuing.

This is closer to the way a procedural program runs,
but is not the way js would run without promises.

*/

function init() {

   const time = {}
   const API_URL = "https://jsonplaceholder.typicode.com"
   const requestURIs =
      [1,2,3].map(num => `${API_URL}/users/${num}`)

   function finishRequestTiming() {
      // mark the end of the request.
      time.end = Date.now()
      const delta = time.end - time.start
      Library.printLight(delta+" ms")
   }

   function togetherGet() {
     Library.print("loading...")
     time.start = Date.now()
     // form a list of Promises
     // where we are getting serveral users
     const listOfPromises = requestURIs.map(Library.getJSON)
     // run them all at the same time
     // and once all are done, display them
     Promise.all(listOfPromises)
       .then(users => {
          Library.clearOutput()
          return users
       })
       .then(users => users.map(user => Library.print(user.name)))
       .then(finishRequestTiming)
   }

   function synchronousGet(){
     time.start = Date.now()

     // this is going to take longer as we're
     // going to process one request at a time.
     let index = 0

     Library.getJSON(requestURIs[index++])
      .then(user => Library.print(user.name))
      .then(() => Library.getJSON(requestURIs[index++]))
      .then(user => Library.print(user.name))
      .then(() => Library.getJSON(requestURIs[index++]))
      .then(user => Library.print(user.name))
      .then(finishRequestTiming)

   }

   // Promise constructor
   const delay = (ms) => new Promise((resolve, reject) => {
      // this will simply delay execution for ms milliseconds
      // in a controlled way
      try {
         setTimeout(resolve, ms)
      } catch (e) {
         reject(e)
      }
   })

   function waitAndLove() {
     // wait 1 second (so you don't seem desperate)
     // then say i love you
     delay(1000)
      .then(() => alert("I love you <3"))
   }

   [
      { id: 'wait', listener: waitAndLove },
      { id: 'all', listener: togetherGet },
      { id: 'notAll', listener: synchronousGet }
   ].forEach(({ id, listener }) => {
      document
         .getElementById(id)
         .addEventListener('click', listener)
   })

   document.removeEventListener('DOMContentLoaded', init)
}

document.addEventListener('DOMContentLoaded', init)