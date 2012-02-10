// <bind>
function debugBind (obj,tag,parent,tree) {
	// # component/nodeInterface
	if (obj.component!=null) {
		var component = Debugger.refTable.pop(obj.component);
		if (!component || (component.type!="context" && component.type!="media")) {
			Debugger.error(Debugger.ERR_INVALID_ID_REFERENCE,tag,["component",obj.component,["context","media"]]);
		} else {
			if (obj.nodeInterface!=null) {
				var nodeInterface = Debugger.refTable.pop(obj.nodeInterface);
				if (!nodeInterface || (component.type=="context" && nodeInterface.type!="port") || (component.type=="media" && nodeInterface.type!="area" && nodeInterface.type!="property")) {
					Debugger.error(Debugger.ERR_INVALID_ID_REFERENCE,tag,["nodeInterface",obj.nodeInterface,component.type=="context"?["port"]:["area","property"]]);
				} else {
					obj.nodeInterface = nodeInterface.obj;
				}
			}
			obj.component = component.obj;
		}
	}
	// # descriptor
	if (obj.descriptor!=null) {
		var reference = Debugger.refTable.pop(obj.descriptor);
		if (!reference || reference.type!="descriptor") {
			Debugger.error(Debugger.ERR_INVALID_ID_REFERENCE,tag,["descriptor",obj.descriptor,["descriptor"]]);
		} else {
			obj.descriptor = reference.obj;
		}
	}	
}