// create a class IndexDB to manage the IndexDB functionalities
export class IndexDB {

  private _indexDB: any;
  private _dbname: string;
  private _dbversion: number;

  // upon instantiating the class, set the variables with these values
  // indexDB prefixed with moz/webkit/ms as its still considered expiremental
  // on those browsers
  constructor(dbname: string, dbversion: number){
    this._indexDB = window.indexedDB;
    this._dbversion = dbversion || 1;
    this._dbname = dbname || "indexDB";
  }

  // createDatabase() will attempt enter a single entry to our database
  public createObjectStore(){
    let req = this._indexDB.open(this._dbname, this._dbversion);
    req.onerror = function(e){ console.log("db request failed") };
    req.onsuccess = function(e){

      // Store the result of opening the database in the db variable.
      // This is used a lot later on, for opening transactions and suchlike.
      let db = req.result;

      // Represents an object store that allows access to a set of data in
      // an IndexedDB database, looked up via primary key.
      let objStore = db.createObjectStore(this._dbname, { autoIncrement : true });

      // define what data items the objectStore will contain
      objStore.createIndex("url", "url", { unique: false });
      objStore.createIndex("name", "name", { unique: false });
      objStore.createIndex("type", "type", { unique: false });

      // close the database
      db.close();
    };
  }

 public insert(data: any){
    let req = this._indexDB.open(this._dbname, this._dbversion);
    req.onerror = function(e){ console.log("db request failed") };
    req.onsuccess = function(e){
      let db = req.result;
      let trans = db.transaction([this._dbname],"readwrite");
      let objStore = trans.objectStore(this._dbname);
      let objStoreReq = objStore.add(data);
      objStoreReq.onsuccess = function(e){
        console.log("Succesfully inserted data!");
      };
      db.close();
    };
  }

}
