// <simpleCondition>
function debugSimpleCondition (obj,debug,parent,tree) {
	// role
	values = ["onBegin","onEnd","onAbort","onPause","onResume","onSelection","onBeginAttribution","onEndAttribution"];
	if (obj.role!=null && jQuery.inArray(obj.role,values)==-1) {
		debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["role",obj.role,values]);
	}
	if (obj.role!=null) {
		if (jQuery.inArray(obj.role,values)==-1) {
			debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["role",obj.role,values]);
		} else {
			var connectorID = tree.split("causalConnector#")[1].split(">")[0];
			if (!debug.uniqueTable["id#"+connectorID]) {
				debug.uniqueTable["id#"+connectorID] = [];
			}
			if (debug.uniqueTable["id#"+connectorID][obj.role]) {
				if (!debug.uniqueTable["id#"+connectorID][obj.role].duplicated) {
					debug.uniqueTable["id#"+connectorID][obj.role].duplicated = true;
					debug.error(debug.ERR_DUPLICATED_ATTR,"role",[obj.role,connectorID,["simpleAction","simpleCondition","attributeAssessment"]]);
				}
			} else {
				debug.uniqueTable["id#"+connectorID][obj.role] = {
					duplicated: false
				};
			}
		}
	}
	// transition
	values = ["starts","stops","pauses","resumes","aborts"];
	if (obj.transition!=null && jQuery.inArray(obj.transition,values)==-1) {
		debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["transition",obj.transition,values]);
	}
	// eventType
	values = ["presentation","selection","attribution"];
	if (obj.eventType!=null && jQuery.inArray(obj.eventType,values)==-1) {
		debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["eventType",obj.eventType,values]);
	}
	// key
	values = [
		"0-9","A-Z","*","#","MENU","INFO","GUIDE","CURSOR_DOWN","CURSOR_LEFT","CURSOR_RIGHT",
		"CURSOR_UP","CHANNEL_DOWN","CHANNEL_UP","VOLUME_DOWN","VOLUME_UP","ENTER","RED","GREEN",
		"YELLOW","BLUE","BACK","EXIT","POWER","REWIND","STOP","EJECT","PLAY","RECORD","PAUSE"
	];
	patt = /^\s*([0-9A-Z]|\*|#|MENU|INFO|GUIDE|CURSOR_DOWN|CURSOR_LEFT|CURSOR_RIGHT|CURSOR_UP|CHANNEL_DOWN|CHANNEL_UP|VOLUME_DOWN|VOLUME_UP|ENTER|RED|GREEN|YELLOW|BLUE|BACK|EXIT|POWER|REWIND|STOP|EJECT|PLAY|RECORD|PAUSE)\s*$/;
	if (obj.key!=null && !patt.test(obj.key)) {
		debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["key",obj.key,values]);
	}
	// min
	values = ["(n�mero inteiro entre 1 e max)"];
	patt = /^\s*\d+\s*$/;
	if (obj.min!=null) {
		if (!patt.test(obj.min)) {
			debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["min",obj.min,values]);
		} else {
			if (parseInt(obj.min)<1 || (obj.max!=null && obj.max!="unbounded" && parseInt(obj.max)<parseInt(obj.min))) {
				debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["min",obj.min,values]);
			}
		}
	}
	// max
	values = ["(n�mero inteiro maior ou igual a min)","unbounded"];
	patt = /^\s*(\d+|unbounded)\s*$/;
	if (obj.max!=null) {
		if (!patt.test(obj.max)) {
			debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["max",obj.max,values]);
		} else {
			if (obj.max!="unbounded") {
				if (parseInt(obj.max)<1 || (obj.min!=null && parseInt(obj.max)<parseInt(obj.min))) {
					debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["max",obj.max,values]);
				}
			}
		}
	}
	// qualifier
	values = ["and","or"];
	if (obj.qualifier==null) {
		if (obj.min!=null && parseInt(obj.min)>1) {
			debug.error(debug.ERR_MISSING_ATTR,tag,["qualifier"]);
		} else if (obj.max!=null && (obj.max=="unbounded" || parseInt(obj.max)>1)) {
			debug.error(debug.ERR_MISSING_ATTR,tag,["qualifier"]);
		}
	} else if (jQuery.inArray(obj.qualifier,values)==-1) {
		debug.error(this.ERR_INVALID_ATTR_VALUE,tag,["qualifier",obj.qualifier,values]);
	}
}