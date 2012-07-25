//ok
var x = 0;
var y = 0;
var tamanhoX = 0;
var tamanhoY = 0;
var inicioX = 0;
var inicioY = 0;
var fimX = 0;
var fimY = 0;



function createContext(id, w, h) {
    var canvas = document.createElement('canvas');
    canvas.id = id;
    tamanhoX = fimX = canvas.width = w;
    tamanhoY = fimY = canvas.height = h;
    canvas.setAttribute('style', 'border: black 1px solid');
    ctx = canvas.getContext("2d");
    
   
  	    
    document.body.appendChild(canvas);
	    
	return ctx;  
	       
}

//ok
function attrSize(ctx){
	
	var canvas = document.getElementById(id);
	
	var dimensao = new Array();
	
	dimensao[0] = ctx.canvas.width;
	dimensao[1] = ctx.canvas.height;
	
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

function attrClip(ctx, xx, yy, w, h){
	
	x = xx;
	y= yy;
	tamanhoX = w;
	tamanhoY = h; 
	
	
	ctx.lineWidth = "1";
	ctx.strokeRect(x,y,tamanhoX,tamanhoY);
   
	
}    

//verifica se o tamanho solicitado eh superior ao permitido no clip
function IniVerifClip(x1, y1, x2, y2){	
	
	inicioX = x + x1;
	inicioY = y + y1;
	fimX = x + x2;
	fimY = y + y2;
	var verifica = true;
	
	
	
	if(fimX > tamanhoX+x)
		fimX = tamanhoX+x;
		
	if(fimY > tamanhoY+y)
		fimY = tamanhoY+y;
		
	if(inicioX > tamanhoX+x)
		inicioX = tamanhoX+x;
		
	if(inicioY > tamanhoY+y)
		inicioY = tamanhoY+y;
		
	if(inicioX >= tamanhoX+x && fimX >tamanhoX+x || inicioY >= tamanhoY+y && fimY >= tamanhoY+y){
		verifica = false;
		
	}
		
	return verifica;	
}

function IniVerifClip2(x1, y1, x2, y2){
	inicioX = x + x1;
	inicioY = y + y1;
	fimX = x2;
	fimY = y2;
	var verifica = true;
	var sub= 0;
	
	if(inicioX+fimX > x+tamanhoX){
		sub = (inicioX+fimX) - (x+tamanhoX);
		fimX = fimX-sub;	
	}
	
	if(inicioY+fimY > y+tamanhoY){
		sub = (inicioY+fimY) - (y+tamanhoY);
		fimY = fimY-sub;	
	}
		
	
	if(inicioX >= tamanhoX+x || inicioY >= tamanhoY+y){
		verifica = false;
	}
	
	return verifica;
	
}


function attrCrop(ctxFonte, ctxDestino, x, y, w, h){
	
	canvasData = ctxFonte.getImageData(x, y, w, h);
	
	ctxDestino.putImageData(canvasData, 0, 0);
}


//ok		
function drawLine(ctx, x1, y1, x2, y2){
	
	
	
	var verifica = IniVerifClip(x1, y1, x2, y2);
	
	if(verifica){
		ctx.beginPath();
		ctx.moveTo(inicioX,inicioY);
		ctx.lineTo(fimX,fimY);
						
		ctx.stroke(); 
	}
	
	else{
		alert("Coordenadas fora da area selecionada para desenho")
	}
	
	
		
}



//ok
function drawRect(ctx, x1, y1, x2, y2, modo){
	
	var verifica = IniVerifClip2(x1,y1,x2,y2);
	
	
	
	if(verifica){
		if(modo == "fill"){
			ctx.fillRect(inicioX, inicioY, fimX, fimY);
		}
		
		else if(modo == "frame"){
			ctx.strokeRect(inicioX, inicioY, fimX, fimY);
		}
		
		else{
			alert("modo não existe - Escolha fill ou frame");
			
		}
	}
	
	else{
		alert("Coordenadas fora da area selecionada para desenho")
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

function compose(ctxFonte, ctxDestino){
	
	canvasData = ctxFonte.getImageData(0, 0, ctxFonte.canvas.width, ctxFonte.canvas.height);
	
	ctxDestino.putImageData(canvasData, 0, 0);
}


function flush(ctx){
	
	ctx.save();
	
}




  
	
