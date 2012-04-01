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
	
	error: function (id, tag, params) {
		// Error
		console.error("[" + id + "] " + this.MESSAGES[id] + "\n" + tag + ": " + params.join(","));
		this.abort = true;
	},
	
	warning: function (id, tag, params) {
		// Warning
		console.warn("[" + id + "] " + this.MESSAGES[id] + "\n" + tag + ": " + params.join(","));
	}
	
};
