function libPersistent(dataBaseName){
	
	this.name = dataBaseName;
	var db;	
	
	//firefox
	if (window.mozIndexedDB) {
            window.indexedDB = window.mozIndexedDB;
            window.IDBKeyRange = window.IDBKeyRange;
            window.IDBTransaction = window.IDBTransaction;
		}
	//Chrome
	if (window.webkitIndexedDB) {
	            window.indexedDB = window.webkitIndexedDB;
	            window.IDBKeyRange = window.webkitIDBKeyRange;
	            window.IDBTransaction = window.webkitIDBTransaction;
	}
	//IE
	if (window.msIndexedDB) {
	            window.indexedDB = window.msIndexedDB;
	}
		
		
	var dbreq = window.indexedDB.open(this.name);
	
	dbreq.onsuccess = function (event) {
			
	        
	        // IE prototype Implementation
	        if (event.result) {
	                db = event.result;
	                
	        }
	        //IE 10 Preview 3, Firefox & Chrome implementation 
	        else {
	                db = dbreq.result;
	                
	        }
	        document.write("Sucess to create indexedDB");
	        
	        var request = db.setVersion(1);
	              
	}
		
	dbreq.onerror = function (e) {
	       // Log or show the error message
	       console.log("Fail to create indexedDB");
	}	
		
};

libPersistent.prototype.addField = function(){
	
	
	var dbreq = window.indexedDB.open(this.name);
		
	dbreq.onsuccess = function (evt) {
			
	        
	        // IE prototype Implementation
	        if (evt.result) {
	                db = evt.result;
	                
	        }
	        //IE 10 Preview 3, Firefox & Chrome implementation 
	        else {
	                db = dbreq.result;
	                
	        }
	        console.log("Sucess to open indexedDB");
	        
	        
	        alert(db.version);
	            	      
	};
	
	dbreq.onupgradeneeded = function(evt) {
		
		var objectStore = evt.currentTarget.result.createObjectStore("people", { keyPath: "id", autoIncrement: true });
		objectStore.createIndex("name", "name", { unique: true });
        objectStore.createIndex("email", "email", { unique: true });
	}
		
	dbreq.onerror = function (evt) {
	       // Log or show the error message
	       console.log("Fail to create indexedDB");
	};	
	
}




