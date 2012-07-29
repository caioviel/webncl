//TODO: implement the handler as vector
//TODO: add the position arg for register()
//TODO: add the destination arg for post

function libEvents(player){
	this.player = player;
	this.handlers = undefined;
	tmp = player.id;
	this.nodeId = tmp.substring(tmp.indexOf('_')+1);
};

libEvents.prototype.register = function(fct){
	console.log('libEvents.register()');
	this.handlers = fct;
}

libEvents.prototype.unregister = function(fct){
	console.log('libEvents.unregister()');
	this.handlers = undefined;
}

libEvents.prototype.post = function(evt){
	console.log('libEvents.post()')

	if (evt.str['class'] == 'key') {
		this.player.postEvent(evt.str);	
	} else if (evt.str['class'] == 'ncl') {
		var json = {'class' : 'ncl', 'type' : evt.str['type'], 'action' : evt.str['action'], 'component' : this.nodeId};
		this.player.postEvent(json);
	}

}

libEvents.prototype.timer = function(t,callback,manager){
	manager.add(t,callback);	

}
