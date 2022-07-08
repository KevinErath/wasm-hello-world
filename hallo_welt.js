async function fetchLocal(url) {
  return new Promise(function(resolve, _) {
    var request = new XMLHttpRequest();
    request.onload = function() {
      resolve(new Response(request.responseText));
    };
    request.open('GET', url);
    request.send(null);
  });
}

var memory;

this.fetchLocal('./hallo_welt.wasm').then(response=>response.arrayBuffer()).then(bytes=> WebAssembly.instantiate(bytes, {
  env: {
    write: function write_to_document(offset) {
      var a = new Uint8Array(memory.buffer);
      for (var i = offset; a[i]; i++)
        document.write(String.fromCharCode(a[i]));
    }
  }
})
).then(results => {
  instance = results.instance;
  memory = instance.exports.pagememory;
  instance.exports.print_hello_world();
}).catch(console.error);