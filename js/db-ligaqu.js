//membuat database ligaqu-apps
var dbPromised = idb.open("ligaqu-apps", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
     autoIncrement:true
  });
  articlesObjectStore.createIndex("post_title", "post_title", { unique: false });
});

//menambahkan Operasi Simpan
function simpanTeam(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil di simpan.");
    });
}

//mengambil semua data
function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

//menampilkan data berdasarkan id
function getById(data) {
  let id = parseInt(data);
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        console.log(team);
        resolve(team);
      });
  });
}

//menghapus team berdasarkan id
function hapusTeam(id) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(id);
      store.delete(id);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil di Hapus");
    });
}