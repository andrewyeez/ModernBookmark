// create a class IndexDB to manage the IndexDB functionalities
export class IndexDB {

  // upon instantiating the class, set the variables with these values
  constructor(dbname, dbversion){
    this.indexDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.dbversion = dbversion || 1;
    this.dbname = dbname || "indexDB";
  }

  // createDatabase() will attempt enter a single entry to our database
  function createObjectStore(){
    var req = this.indexDB.open(dbname, dbversion);
    req.onerror = function(event){ console.log("db request failed") };
    req.onsuccess = function(event){

      // Store the result of opening the database in the db variable.
      // This is used a lot later on, for opening transactions and suchlike.
      var db = req.result;

      // Represents an object store that allows access to a set of data in
      // an IndexedDB database, looked up via primary key.
      var objectStore = db.createObjectStore(dbname, { autoIncrement : true });

      // define what data items the objectStore will contain
      objectStore.createIndex("url", "url", { unique: false });
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("type", "type", { unique: false });

      // close the database
      db.close();
    };
  }

  function insert(data){
    var req = this.indexDB.open(dbname, dbversion);
    req.onerror = function(event){ console.log("db request failed") };
    req.onsuccess = function(event){
      var db = req.result;
      var transaction = db.transaction([dbname],"readwrite");
      var objectStore = transaction.objectStore(dbname);
      var objectStoreReq = objectStore.add(data);
      objectStoreReq.onsuccess = function(event){
        console.log("Succesfully inserted data!");
      };
      db.close();
    };
  }

}
