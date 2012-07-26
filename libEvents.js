function libEvents(){
	
	
	
};


libEvents.prototype.register = function(selcetor, evt, fct){
	
	$(selector).bind(evt,fct);
	
}

libEvents.prototype.unregister = function(selcetor, evt, fct){
	
	$(selector).unbind(evt,fct);
}

libEvents.prototype.post = function(evt){
	
	//importing from webncl.js
	player.postEvent(evt);	
	
}

libEvents.prototype.timer = function(t,callback,manager){
	
	//importing from Timer.js
	manager.add(t,callback);	
	
}


