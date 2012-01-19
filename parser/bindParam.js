// <bindParam>
function parseBindParam (parent) {
	var parentData = $(parent).find("> bindParam");
	if ($(parentData).length == 0) return false;
	// Debug
	var attr = {
		reference: [],
		required: ["name","value"],
		optional: [],
		oneOf: [],
		custom: []
	};
	var tags = {
		optional: [],
		one: [],
		plus: [],
		plusOneOf: [],
		star: [],
		custom: []
	};
	// Parse
	var data = [];
	$(parentData).each(function() {
		data.push({
			name: $(this).attr("name"),	// !
			value: $(this).attr("value")	// !
		});
		debug.checkAll(this,attr,tags,data[data.length-1]);
	});
	return data;
}