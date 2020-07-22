class IndexedDB {
    constructor(divName) {
        this.divName = divName;
        this.dbName = 'audioDB';
        this.version = 1;
        this.transaction;
        this.store;
        this.db;

        // new //
        let openRequest = indexedDB.open(this.dbName, this.dbVersion);

        openRequest.onupgradeneeded = (event) => {
            // triggers if the client had no database
            // ...perform initialization...
            console.log('upgrade needed triggered');
            if(!this.db){
                this.db = event.target.result;
            }
            
            this.db.createObjectStore(this.divName);
            let transaction = this.db.transaction(this.divName, 'readwrite');
            let store = transaction.objectStore(this.divName);
            store.put('test he he');
        };

        openRequest.onerror = () => {
            console.error("Error", openRequest.error);
        };

        openRequest.onsuccess = () => {
            this.db = openRequest.result;
            console.log('db conn successful', this.db)
            // continue to work with database using db object
            this.setVersionEvents();
           

        };

        openRequest.onblocked = () => {
            // this event shouldn't trigger if we handle onversionchange correctly

            // it means that there's another open connection to same database
            // and it wasn't closed after db.onversionchange triggered for them
            console.warn('event blocked');
        };


    }

    setVersionEvents() {
        this.db.onversionchange = () => {
            this.db.close();
            alert("Database is outdated, please reload the page.")
        };
    }

    deleteDB() {
        let deleteRequest = indexedDB.deleteDatabase(this.dbName);

        deleteRequest.onsuccess = () => {

        }
        deleteRequest.onerror = () => {

        }
    }

    deleteObjectStore() {
        this.db.deleteObjectStore(this.divName);
    }

    openDB() {
        return new Promise((resolve, reject) => {
            var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
            var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
            const request = indexedDB.open(this.dbName, this.version);
            request.onupgradeneeded = function (event) {
                this.createObjectStore(event.target.result);
            };
            request.onsuccess = _ => resolve(request.result);
            request.onerror = _ => reject(request.error);
        });
    }

    onupgradeneeded(event) {
        this.db = event.target.result;
        this.createObjectStore(this.divName);
        console.log('upgrade needed:', event)
    }

    putToDb(file) {
        //Add new file
        this.store.put(file, file.name).onsuccess = event => {
            console.log('put file in successfully')
        };
    }

    getFromDb(file) {
        this.store.get(file.name).onsuccess = event => {
            var audioFile = event.target.result;
            console.log('got audio file:', audioFile)
            console.log('file name', audioFile.name)
            var audioURL = URL.createObjectURL(audioFile);
            console.log('transaction complete');
            console.log('Audio URL: ', audioURL);
        }
    }

    createObjectStore = function (dataBase) {
        // Create an objectStore
        console.log("Creating objectStore")
        dataBase.createObjectStore(divName);
    }

    async insertStoreName(divName) {
        this.db = await this.openDB();
        await new Promise((resolve, reject) => {
            this.transaction = this.db.transaction(divName, 'readwrite');
            this.store = this.transaction.objectStore(divName);


            // for(const file of files) {
            //     store.put(file);
            // }

            this.store.onsuccess = event => resolve();
            this.store.onerror = event => reject(new Error('file storage error'));
        });
        this.db.close();
    }

    async onFileUpload(file, divName) {
        (function () {
            // IndexedDB
            var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
                IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
                dbVersion = 2.0;

            // Create/open database
            var request = indexedDB.open("elephantFiles", dbVersion),
                db,
                createObjectStore = function (dataBase) {
                    // Create an objectStore
                    console.log("Creating objectStore")
                    dataBase.createObjectStore(divName);
                },

                getAudioFile = function () {


                    // Put the received blob into IndexedDB
                    putAudioInDB(file);

                },

                putAudioInDB = function (blob) {
                    console.log("Putting elephants in IndexedDB");

                    // Open a transaction to the database
                    var transaction = db.transaction([divName], 'readwrite');

                    // Put the blob into the dabase
                    var put = transaction.objectStore(divName).put(blob, "audio");

                    // Retrieve the file that was just stored
                    transaction.objectStore(divName).get("audio").onsuccess = function (event) {
                        var imgFile = event.target.result;
                        console.log("Got elephant!" + imgFile);

                        // Get window.URL object
                        var URL = window.URL || window.webkitURL;

                        // Create and revoke ObjectURL
                        var imgURL = URL.createObjectURL(imgFile);

                        // Set img src to ObjectURL
                        // var imgElephant = document.getElementById("elephant");
                        // imgElephant.setAttribute("src", imgURL);
                        console.log('Audio URL: ', imgURL);

                        // Revoking ObjectURL
                        URL.revokeObjectURL(imgURL);
                    };
                };

            request.onerror = function (event) {
                console.log("Error creating/accessing IndexedDB database");
            };

            request.onsuccess = function (event) {
                console.log("Success creating/accessing IndexedDB database");
                db = request.result;

                db.onerror = function (event) {
                    console.log("Error creating/accessing IndexedDB database");
                };

                // Interim solution for Google Chrome to create an objectStore. Will be deprecated
                if (db.setVersion) {
                    if (db.version != dbVersion) {
                        var setVersion = db.setVersion(dbVersion);
                        setVersion.onsuccess = function () {
                            createObjectStore(db);
                            getAudioFile();
                        };
                    }
                    else {
                        getAudioFile();
                    }
                }
                else {
                    getAudioFile();
                }
            }

            // For future use. Currently only in latest Firefox versions
            request.onupgradeneeded = function (event) {
                createObjectStore(event.target.result);
            };
        })();
    }
}