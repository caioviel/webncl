var Debugger = {

	// Warnings
	WARN_INVALID_ATTR:					100,	// Atributo inv�lido
	WARN_INVALID_TAG:						101,	// Tag inv�lida
	WARN_INVALID_HEAD_STRUCTURE:		102,	// Estrutura do cabe�alho inv�lida
	WARN_INVALID_REGION_DIMENSIONS:	103,	// Dimens�es de regi�o inv�lidas
	WARN_DUPLICATED_ZINDEX:				104,	// zIndex duplicado
	WARN_NOT_IMPLEMENTED_YET:			105,	// Recurso n�o implementado ainda
	
	// Errors
	ERR_MISSING_ATTR:						201,	// Atributo obrigat�rio faltando
	ERR_MISSING_ATTR_ONEOF:				202,	// Atributo obrigat�rio faltando (um desses)
	ERR_MISSING_ATTR_DEP:				203,	// Atributo dependente faltando
	ERR_TOO_MANY_ATTRS:					204,	// Excesso de atributos repetidos
	ERR_MISSING_TAG:						205,	// Tag obrigat�ria faltando (+,1)
	ERR_MISSING_TAG_ONEOF:				206,	// Tag obrigat�ria faltando (|+,|1)
	ERR_TOO_MANY_TAGS:					207,	// Excesso de tags repetidas (?,1)
	ERR_TOO_MANY_TAGS_ONEOF:			208,	// Excesso de tags (apenas uma permitida)
	ERR_INVALID_ATTR_VALUE:				209,	// Valor de atributo inv�lido
	ERR_INVALID_ID_REFERENCE:			210,	// Refer�ncia a um ID inv�lido
	ERR_DUPLICATED_ID:					211,	// ID duplicado
	ERR_INCOMPATIBLE_FILE_EXT:			212,	// Extens�o de arquivo incompat�vel com o MIMETYPE
	ERR_INVALID_URI:						213,	// URI inv�lida
	ERR_DUPLICATED_ATTR:					214,	// Atributo duplicado
	ERR_DUPLICATED_ALIAS:				215,	// Alias duplicado
	ERR_INVALID_CONTEXT_REFERENCE:	216,	// Objeto referenciado em outro contexto
	
	MESSAGES: {
		100: "Atributo inv�lido",
		101: "Tag inv�lida",
		102: "Estrutura do cabe�alho inv�lida",
		103: "Dimens�es de regi�o inv�lidas",
		104: "zIndex duplicado",
		105: "Recurso n�o implementado ainda",
		201: "Atributo obrigat�rio faltando",
		202: "Atributo obrigat�rio faltando (um desses)",
		203: "Atributo dependente faltando",
		204: "Excesso de atributos repetidos",
		205: "Tag obrigat�ria faltando",
		206: "Tag obrigat�ria faltando (uma dessas)",
		207: "Excesso de tags repetidas",
		208: "Excesso de tags (apenas uma permitida)",
		209: "Valor de atributo inv�lido",
		210: "Refer�ncia a ID inv�lido",
		211: "ID duplicado",
		212: "Extens�o de arquivo incompat�vel com o MIMETYPE",
		213: "URI inv�lida",
		214: "Atributo duplicado",
		215: "Alias duplicado",
		216: "Objeto referenciado em outro contexto"
	},
	
	abort: false,
	
	refTable: {
		// Tabela de IDs que podem ser referenciados por outros objetos
		table: [],
		push: function (id,objType,ref,pid) {
			if (this.table[id]) {
				if (objType=="property" || objType=="connectorParam") {
					// name: n�o pode repetir no mesmo pai
					if (this.table[id][pid]) {
						return false;
					}
				} else {
					// id: n�o pode repetir nunca
					return false;
				}
			} else {
				this.table[id] = [];
			}
			this.table[id][pid] = {
				type: objType,
				obj: ref
			};
			return true;
		},
		pop: function (id,pid) {
			if (pid) {
				return this.table[id][pid];
			} else {
				for (parent in this.table[id]) {
					return this.table[id][parent];
				}
				return false;
			}
		}
	},	
	
	uniqueTable: [],
	
	checkAll: function (parent,attr,tags,obj) {
		// Checa todos os erros antes da cria��o do objeto
		this.checkAttributes(parent,attr,obj);
		this.checkChildrenTags(parent,tags);
	},
	
	checkFile: function (file) {
		$.ajax({
			type: "GET",
			url: file,
			dataType: "txt",
			success: function (data) {
				console.log("NCL lines: " + data.split("\n").length);
				// TODO: verificar a sintaxe do arquivo XML
			}
		});
	},
	
	checkAttributes: function (parent, attrs, obj) {
		// Atributos inv�lidos
		// O par�metro attrs deve ter o seguinte formato:
		// attr = {
		//		reference: [...],	// Atributos que podem ser referenciados (IDs)
		//		required: [...],	// Atributos obrigat�rios
		//		optional: [...],	// Atributos opcionais
		//		custom: [...],		// Atributos com valida��o customizada pela fun��o validate
		//		// A fun��o validate � obrigat�ria apenas se custom n�o for vazio
		//		validate: function (attrs,errors) {
		//    	...
		//		}
		// }
		//	O par�metro errors da fun��o validate tem o seguinte formato:
		//	errors = [{
		//		code: N				// C�digo do erro
		//		params: [...]		// Par�metros do erro
		//	}]
		var attrObj = $(parent).get(0).attributes;
		var parentName = $(parent).get(0).tagName;
		var foundAttrs = [];
		for (var i=0; i<attrObj.length; i++) {
			foundAttrs.push(attrObj.item(i).name);
		}
		// #
		for (attr in attrs.reference) {
			if ($(parent).attr(attrs.reference[attr])) {
				var type = attrs.reference[attr]=="focusIndex" ? "focusIndex" : parentName;
				if (!this.refTable.push($(parent).attr(attrs.reference[attr]),type,obj,$(parent).parent().attr("id"))) {
					this.error(this.ERR_DUPLICATED_ID,parentName,[attrs.reference[attr],$(parent).attr(attrs.reference[attr]),$(parent).parent().attr("id")]);
				}
			}
		}
		// !
		for (attr in attrs.required) {
			var index = foundAttrs.indexOf(attrs.required[attr]);
			if (index == -1) {
				this.error(this.ERR_MISSING_ATTR,parentName,[attrs.required[attr]]);
			} else {
				foundAttrs[index] = 0;
				while (index = foundAttrs.indexOf(attrs.required[attr]) != -1) {
					this.error(this.ERR_TOO_MANY_ATTRS,parentName,[attrs.required[attr]]);
					foundAttrs[index] = 0;
				}
			}
		}
		// ?
		for (attr in attrs.optional) {
			var index = foundAttrs.indexOf(attrs.optional[attr]);
			if (index != -1) {
				foundAttrs[index] = 0;
				while (index = foundAttrs.indexOf(attrs.required[attr]) != -1) {
					this.error(this.ERR_TOO_MANY_ATTRS,parentName,[attrs.required[attr]]);
					foundAttrs[index] = 0;
				}
			}
		}
		// !1
		var oneFound = attrs.oneOf.length==0;
		for (attr in attrs.oneOf) {
			var index = foundAttrs.indexOf(attrs.oneOf[attr]);
			if (index != -1) {
				oneFound = true;
				foundAttrs[index] = 0;
				while (index = foundAttrs.indexOf(attrs.oneOf[attr]) != -1) {
					this.error(this.ERR_TOO_MANY_ATTRS,parentName,[attrs.oneOf[attr]]);
					foundAttrs[index] = 0;
				}
			}
		}
		if (!oneFound) {
			this.error(this.ERR_MISSING_ATTR_ONEOF,parentName,attrs.oneOf);
		}
		// Atributos inv�lidos
		for (attr in foundAttrs) {
			if (foundAttrs[attr] != 0) {
				this.warning(this.WARN_INVALID_ATTR,parentName,[foundAttrs[attr]]);
			}
		}
	},
	
	checkChildrenTags: function (parent,tags) {
		// Tags inv�lidas
		// O par�metro tags deve ter o seguinte formato:
		// tags = {
		//		optional: [...],	// Tags opcionais
		//		one: [...],			// Tags obrigat�rias e �nicas
		//		plus: [...],		// Tags obrigat�rias e m�ltiplas
		//		plusOneOf: [...],	// Tags obrigat�rias e m�ltiplas (pelo menos uma)
		//		star: [...],		// Tags opcionais e m�ltiplas
		//		custom: [...],		// Tags com valida��o customizada pela fun��o validate
		//		// A fun��o validate � obrigat�ria apenas se custom n�o for vazio
		//		validate: function (count,errors) {
		//    	...
		//		}
		// }
		//	O par�metro errors da fun��o validate tem o seguinte formato:
		//	errors = [{
		//		code: N				// C�digo do erro
		//		params: [...]		// Par�metros do erro
		//	}]
		var parentName = $(parent).get(0).tagName;
		var tagCount = [];
		var validTags = [];
		validTags = validTags.concat(tags.one,tags.optional,tags.plus,tags.plusOneOf,tags.star,tags.custom);
		for (var tag in validTags) {
			tagCount[validTags[tag]] = 0;
		}
		$(parent).find("> *").each(function() {
			var tagName = $(this).get(0).tagName;
			if (tagCount[tagName]) {
				tagCount[tagName]++;
			} else {
				tagCount[tagName] = 1;
			}
		});
		// ?
		for (var tag in tags.optional) {
			if (tagCount[tags.optional[tag]] > 1) {
				this.error(this.ERR_TOO_MANY_TAGS,parentName,[tags.optional[tag]]);
			}
			tagCount[tags.optional[tag]] = 0;
		}
		// 1
		for (var tag in tags.one) {
			if (tagCount[tags.one[tag]] > 1) {
				this.error(this.ERR_TOO_MANY_TAGS,parentName,[tags.one[tag]]);
			}
			if (tagCount[tags.one[tag]] == 0) {
				this.error(this.ERR_MISSING_TAG,parentName,[tags.one[tag]]);
			}
			tagCount[tags.one[tag]] = 0;
		}
		// +
		for (var tag in tags.plus) {
			if (tagCount[tags.plus[tag]] == 0) {
				this.error(this.ERR_MISSING_TAG,parentName,[tags.plus[tag]]);
			}
			tagCount[tags.plus[tag]] = 0;
		}
		// |+
		var atLeastOne = tags.plusOneOf.length==0;
		for (var tag in tags.plusOneOf) {
			if (tagCount[tags.plusOneOf[tag]] > 0) {
				atLeastOne = true;
			}
			tagCount[tags.plusOneOf[tag]] = 0;
		}
		if (!atLeastOne) {
			this.error(this.ERR_MISSING_TAG_ONEOF,parentName,tags.plusOneOf);
		}
		// *
		for (var tag in tags.star) {
			tagCount[tags.star[tag]] = 0;
		}
		// custom
		if (tags.custom.length > 0) {
			tags.validate(tagCount,errors=[]);
			for (err in errors) {
				this.error(errors[err].code,parentName,errors[err].params);
			}
			for (var tag in tags.custom) {
				tagCount[tags.custom[tag]] = 0;
			}			
		}
		// Tags inv�lidas
		for (var tag in tagCount) {
			if (tagCount[tag] > 0) {
				this.warning(this.WARN_INVALID_TAG,parentName,[tag]);
			}
		}
	},
	
	error: function (id, tag, params) {
		// Error
		console.error("[" + id + "] " + this.MESSAGES[id] + "\n" + tag + ": " + params.join(","));
		this.abort = true;
	},
	
	warning: function (id, tag, params) {
		// Warning
		console.warn("[" + id + "] " + this.MESSAGES[id] + "\n" + tag + ": " + params.join(","));
	},
	
	debugTag: function (tag, obj, parent, tree) {
		if (tag == "ncl") {
			this.debugNCL(obj,tag,parent,tree);
		} else {
			this["debug"+tag[0].toUpperCase()+tag.slice(1,tag.length)](obj,tag,parent,tree);
		}
	},
	
	debugNCL: debugNCL,
	debugArea: debugArea,
	debugAssessmentStatement: debugAssessmentStatement,
	debugAttributeAssessment: debugAttributeAssessment,
	debugBind: debugBind,
	debugBindParam: debugBindParam,
	debugBindRule: debugBindRule,
	debugBody: debugBody,
	debugCausalConnector: debugCausalConnector,
	debugCompositeRule: debugCompositeRule,
	debugCompoundAction: debugCompoundAction,
	debugCompoundCondition: debugCompoundCondition,
	debugCompoundStatement: debugCompoundStatement,
	debugConnectorBase: debugConnectorBase,
	debugConnectorParam: debugConnectorParam,
	debugContext: debugContext,
	debugDefaultComponent: debugDefaultComponent,
	debugDefaultDescriptor: debugDefaultDescriptor,
	debugDescriptor: debugDescriptor,
	debugDescriptorBase: debugDescriptorBase,
	debugDescriptorParam: debugDescriptorParam,
	debugDescriptorSwitch: debugDescriptorSwitch,
	debugHead: debugHead,
	debugImportBase: debugImportBase,
	debugImportedDocumentBase: debugImportedDocumentBase,
	debugImportNCL: debugImportNCL,
	debugLink: debugLink,
	debugLinkParam: debugLinkParam,
	debugMapping: debugMapping,
	debugMedia: debugMedia,
	debugMeta: debugMeta,
	debugMetadata: debugMetadata,
	debugPort: debugPort,
	debugProperty: debugProperty,
	debugRegion: debugRegion,
	debugRegionBase: debugRegionBase,
	debugRule: debugRule,
	debugRuleBase: debugRuleBase,
	debugSimpleAction: debugSimpleAction,
	debugSimpleCondition: debugSimpleCondition,
	debugSwitch: debugSwitch,
	debugSwitchPort: debugSwitchPort,
	debugTransition: debugTransition,
	debugTransitionBase: debugTransitionBase,
	debugValueAssessment: debugValueAssessment	
	
};