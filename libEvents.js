function libEvents(){
	
	
	
};


libEvents.prototype.register = function(secletor, evt, fct){
	
	$(selector).bind(evt,fct);
	
}

libEvents.prototype.unregister = function(secletor, evt, fct){
	
	$(selector).unbind(evt,fct);
}


