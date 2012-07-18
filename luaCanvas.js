//ok
function createContext(id, w, h) {
    var canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext("2d");
    
   
  	    
    document.body.appendChild(canvas);
	    
	return ctx;  
	       
}

//ok
function attrSize(id){
	
	var canvas = document.getElementById(id);
	
	var dimensao = new Array();
	
	dimensao[0] = canvas.width;
	dimensao[1] = canvas.height;
	
	return dimensao;
	
}

//ok
function attrColor(ctx, r, g, b, a, modo){
	
	if(modo == "fill")
		ctx.fillStyle = "rgba(" + r + ","+ g + "," + b + "," + a + ")";
		
	else if(modo == "frame"){
		ctx.lineWidth = "5";
		ctx.strokeStyle = "rgba(" + r + ","+ g + "," + b + "," + a + ")";
	}
		
		
}


//ok		
function drawLine(ctx, x1, y1, x2, y2){
	
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
					
	ctx.stroke(); 
		
}

//ok
function drawRect(ctx, x1, y1, x2, y2, modo){
	
	if(modo == "fill"){
		ctx.fillRect(x1, y1, x2, y2);
	}
	
	else if(modo == "frame"){
		ctx.strokeRect(x1,y1,x2,y2);
	}
	
	else{
		alert("modo não existe - Escolha fill ou frame");
		
	}
		
		
}


//ok
function attrText(ctx, face, size, style){
	
	ctx.font = size + " " + face + " " + style;
}

//ok
function drawText(ctx, x, y, text){
	
	
	ctx.fillText(text,x,y); 
	
}

//ok
function measureTextLua(ctx, text){
	
	var textWidth = ctx.measureText (text);
	
	height = ctx.font[0] + ctx.font[1];
	
	var dimensao = new Array();
	
	dimensao[0] = textWidth.width;
	dimensao[1] = height; 
		
	return dimensao;
		
	
} 

//ok
//Definido como padrao imagem inserida na posição (10,10)
function image_path(caminho){
	
	var img = new Image();
	img.src = caminho;
	ctx.drawImage(img, 10,10);
	
}

function attrClip(ctx,id, w, h) {
    var canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.width = w;
    canvas.height = h;
    ctx2 = canvas.getContext("2d");
    
   
  	    
    document.body.appendChild(ctx);
	    
	return ctx;  
	       
}


  
	

