//arreglo de 8x8 que representa el tablero de juego. Los valores que debe contener están entre 0 y 3. El valor de cada celda depende de lo que hay en ella, se especifica abajo
	    
	    //0 = rojo ->ficha de la máquina
	    //1 = azul ->ficha del contrincante
	    //2 = verde ->celda de la máquina
	    //3 = negro ->celda del contrincante

	    //función default de camara de la libreria webcam
		 Webcam.set({
		 	width:350,
		 	height:263,
		 	image_format:'jpg',
		 	jpg_quality:100
		 })
		 Webcam.attach("#camera");

				var canvas = document.getElementById( 'canvas' );
				    context = canvas.getContext( '2d' );

				//para el nuevo canvas
				var canvasArreglo1 = document.getElementById( 'canvasArreglo1' );
		         	contextArreglo1 = canvasArreglo1.getContext( '2d' );
				//para el nuevo canvas
				var canvasArreglo2 = document.getElementById( 'canvasArreglo2' );
		         	contextArreglo2 = canvasArreglo2.getContext( '2d' );
		        //para el nuevo canvas
				var canvasArreglo3 = document.getElementById( 'canvasArreglo3' );
		         	contextArreglo3 = canvasArreglo3.getContext( '2d' );
		        //para el nuevo canvas
				var canvasArreglo4 = document.getElementById( 'canvasArreglo4' );
		         	contextArreglo4 = canvasArreglo4.getContext( '2d' );


		 function take_snapshot(){
		 	Webcam.snap(function(data_uri){
		 		document.getElementById('results').innerHTML='<img id="imagen" src="'+data_uri+'"/>';
		 		/**/
		 		 
		 		 //loadPicture = function () {
				    var imageObj = new Image();
				    var x = document.getElementById("imagen").src;
				    imageObj.src = x;
				 
				    imageObj.onload = function () {
				        context.drawImage( imageObj, 0, 0 );
				    }
			});
		 }

		 function take_snapshot1(){
		 	Webcam.snap(function(data_uri1){
		 		document.getElementById('results1').innerHTML='<img id="imagen1" src="'+data_uri1+'"/>';
		 		/**/
				
		 		 //loadPicture = function () {
				    var imageObjArreglo1 = new Image();
				    var xArreglo1 = document.getElementById("imagen1").src;
				    imageObjArreglo1.src = xArreglo1;
				 
				    imageObjArreglo1.onload = function () {
				        contextArreglo1.drawImage( imageObjArreglo1, 0, 0 );
				    } 
			});
		 }

		 function take_snapshot2(){
		 	Webcam.snap(function(data_uri2){
		 		document.getElementById('results2').innerHTML='<img id="imagen2" src="'+data_uri2+'"/>';
		 		/**/
				
		 		 //loadPicture = function () {
				    var imageObjArreglo2 = new Image();
				    var xArreglo2 = document.getElementById("imagen2").src;
				    imageObjArreglo2.src = xArreglo2;
				 
				    imageObjArreglo2.onload = function () {
				        contextArreglo2.drawImage( imageObjArreglo2, 0, 0 );
				    }


		 	});
		 }

		 function take_snapshot3(){
		 	Webcam.snap(function(data_uri3){
		 		document.getElementById('results3').innerHTML='<img id="imagen3" src="'+data_uri3+'"/>';
		 		/**/
				
		 		 //loadPicture = function () {
				    var imageObjArreglo3 = new Image();
				    var xArreglo3 = document.getElementById("imagen3").src;
				    imageObjArreglo3.src = xArreglo3;
				 
				    imageObjArreglo3.onload = function () {
				        contextArreglo3.drawImage( imageObjArreglo3, 0, 0 );
				    }


		 	});
		 }

		 function take_snapshot4(){
		 	Webcam.snap(function(data_uri4){
		 		document.getElementById('results4').innerHTML='<img id="imagen4" src="'+data_uri4+'"/>';
		 		/**/
				
		 		 //loadPicture = function () {
				    var imageObjArreglo4 = new Image();
				    var xArreglo4 = document.getElementById("imagen4").src;
				    imageObjArreglo4.src = xArreglo4;
				 
				    imageObjArreglo4.onload = function () {
				        contextArreglo4.drawImage( imageObjArreglo4, 0, 0 );
				    }


		 	});
		 }

		 function arreglo1(){
		 		
		 	//Aqui viene la parte de la detección de los colores
				//Listas de datos para almacenar los colores que hay en cada centro (celda) por Canal 
				    var arregloListaR1 = new Array(16);
				    var arregloListaG1 = new Array(16);
				    var arregloListaB1 = new Array(16);

				    var Tablero1 = [
				    [3,3,3,3],
				    [3,3,3,3],
				    [3,3,3,3],
				    [3,3,3,3]
				    ];
				    //arreglo de 4x4 que representa el tablero de juego. Los valores que debe contener están entre 0 y 3. El valor de cada celda depende de lo que hay en ella, se especifica abajo
				    
				    //0 = rojo ->ficha de la máquina
				    //1 = azul ->ficha del contrincante
				    //2 = verde ->celda de la máquina
				    //3 = negro ->celda del contrincante

				    var imageData = contextArreglo1.getImageData( 0, 0, canvasArreglo1.width, canvasArreglo1.height),

					    //var imageData = app.getImgData(),
				        pixels = imageData.data,
				        numPixels = imageData.width * imageData.height;
						console.log(imageData);
					 	console.log(pixels[0]);

					 	var horizontal1=0;//se itera para moverse en horizontal 
					 	var vertical1=1;//se itera para moverse en vertical
					 	var miArreglo1=0;//iterador para almacenar los datos en los arregloLista

					    for ( var i = 0; i < numPixels; i++ ) 
					    {

					        var a =((11593*vertical1)-(43*(vertical1-1))+(87*horizontal1));
					        //console.log(a);
					      if(i== a)
					        {
					        arregloListaR1[miArreglo1]=pixels[ i * 4 ];
					        arregloListaG1[miArreglo1]=pixels[ i * 4 + 1 ];
							arregloListaB1[miArreglo1]=pixels[ i * 4 + 2 ];
 							miArreglo1++;
					        	console.log(a);
					        /*pixels[ i * 4 ] = 255;
					        pixels[ i * 4 + 1 ] = 255;
					        pixels[ i * 4 + 2 ] = 0;*/
					        horizontal1++;
						        if(horizontal1>3)
						        {
						        	horizontal1=0;
						        	vertical1+=2;
						        }
					        } 
					    }
					 
					    contextArreglo1.putImageData( imageData, 0, 0 );//trabajar con el context inicial que es el que ya está cargado 

					    console.log(arregloListaR1);
					    console.log(arregloListaG1);
					    console.log(arregloListaB1);

					    //variables para llenar el tablero
					    var m=0;
					    var n=0;

					    //variable ayudante para llenar el tablero
					    var k=1;

					    //for para identificar el color de cada celda
					    for(var t=0; t<16; t++)
					    {
					    	var valorCelda1=5; //este es el valor que va a ir en cada celda

					    	//comparar los colores para saber cual color está en esa celda
					    	

					    	if( arregloListaR1[t]>arregloListaG1[t] && arregloListaR1[t]>arregloListaB1[t] && arregloListaR1[t]>=70)
					    	{
					    		valorCelda1=0; //rojo
					    	}

					    	if(arregloListaG1[t]>arregloListaR1[t] && arregloListaG1[t]>arregloListaB1[t] && arregloListaG1[t]>=70){
					    		valorCelda1=2; //verde
					    	}

					    	if( arregloListaB1[t]>arregloListaR1[t] && arregloListaB1[t]>arregloListaG1[t] && arregloListaB1[t]>=70){
					    		valorCelda1=1; //azul
					    	}

					    	if(arregloListaR1[t] <60 && arregloListaG1[t] <60 && arregloListaB1[t] <60){
					    		valorCelda1=3; //negro
					    	}



					    	Tablero1[m][n]=valorCelda1;
					    	console.log(m+" "+" "+n);
					    	console.log(t);
					    	console.log(valorCelda1);

					    	n++;
					    	if(t==(3*k+(k-1)))
					    	{
					    		n=0;
					    		m++;
					    		k++;
					    	}

					    	

					    }


					    console.log(Tablero1);

					    //llenar granTablero
					    for(var h=0; h<4;h++)
					    {
					    	for(var w=0;w<4;w++)
					    	{
					    		granTablero[w][h]=Tablero1[w][h];
					    	}
					    }
		 }

		 function arreglo2(){
		 		
		 	//Aqui viene la parte de la detección de los colores
				//Listas de datos para almacenar los colores que hay en cada centro (celda) por Canal 
				    var arregloListaR2 = new Array(16);
				    var arregloListaG2 = new Array(16);
				    var arregloListaB2 = new Array(16);

				    var Tablero2 = [
				    [3,3,3,3],
				    [3,3,3,3],
				    [3,3,3,3],
				    [3,3,3,3]
				    ];
				    //arreglo de 4x4 que representa el tablero de juego. Los valores que debe contener están entre 0 y 3. El valor de cada celda depende de lo que hay en ella, se especifica abajo
				    
				    //0 = rojo ->ficha de la máquina
				    //1 = azul ->ficha del contrincante
				    //2 = verde ->celda de la máquina
				    //3 = negro ->celda del contrincante

				    var imageData = contextArreglo2.getImageData( 0, 0, canvasArreglo2.width, canvasArreglo2.height),

					    //var imageData = app.getImgData(),
				        pixels = imageData.data,
				        numPixels = imageData.width * imageData.height;
						console.log(imageData);
					 	console.log(pixels[0]);

					 	var horizontal2=0;//se itera para moverse en horizontal 
					 	var vertical2=1;//se itera para moverse en vertical
					 	var miArreglo2=0;//iterador para almacenar los datos en los arregloLista

					    for ( var i = 0; i < numPixels; i++ ) 
					    {

					        var a =((11593*vertical2)-(43*(vertical2-1))+(87*horizontal2));
					        //console.log(a);
					      if(i== a)
					        {
					        arregloListaR2[miArreglo2]=pixels[ i * 4 ];
					        arregloListaG2[miArreglo2]=pixels[ i * 4 + 1 ];
							arregloListaB2[miArreglo2]=pixels[ i * 4 + 2 ];
 							miArreglo2++;
					        	console.log(a);
					        /*pixels[ i * 4 ] = 255;
					        pixels[ i * 4 + 1 ] = 255;
					        pixels[ i * 4 + 2 ] = 0;*/
					        horizontal2++;
						        if(horizontal2>3)
						        {
						        	horizontal2=0;
						        	vertical2+=2;
						        }
					        } 
					    }
					 
					    contextArreglo2.putImageData( imageData, 0, 0 );//trabajar con el context inicial que es el que ya está cargado 

					    console.log(arregloListaR2);
					    console.log(arregloListaG2);
					    console.log(arregloListaB2);

					    //variables para llenar el tablero
					    var m=0;
					    var n=0;

					    //variable ayudante para llenar el tablero
					    var k=1;

					    //for para identificar el color de cada celda
					    for(var t=0; t<16; t++)
					    {
					    	var valorCelda2=5; //este es el valor que va a ir en cada celda

					    	//comparar los colores para saber cual color está en esa celda
					    	

					    	if( arregloListaR2[t]>arregloListaG2[t] && arregloListaR2[t]>arregloListaB2[t] && arregloListaR2[t]>=70)
					    	{
					    		valorCelda2=0; //rojo
					    	}

					    	if(arregloListaG2[t]>arregloListaR2[t] && arregloListaG2[t]>arregloListaB2[t] && arregloListaG2[t]>=70){
					    		valorCelda2=2; //verde
					    	}

					    	if( arregloListaB2[t]>arregloListaR2[t] && arregloListaB2[t]>arregloListaG2[t] && arregloListaB2[t]>=70){
					    		valorCelda2=1; //azul
					    	}

					    	if(arregloListaR2[t] <60 && arregloListaG2[t] <60 && arregloListaB2[t] <60){
					    		valorCelda2=3; //negro
					    	}



					    	Tablero2[m][n]=valorCelda2;
					    	console.log(m+" "+" "+n);
					    	console.log(t);
					    	console.log(valorCelda2);

					    	n++;
					    	if(t==(3*k+(k-1)))
					    	{
					    		n=0;
					    		m++;
					    		k++;
					    	}

					    	

					    }


					    console.log(Tablero2);

					    //llenar granTablero
					    for(var h=0; h<4;h++)
					    {
					    	for(var w=0;w<4;w++)
					    	{
					    		granTablero[w][h+4]=Tablero2[w][h];
					    	}
					    }
		 }


		 function arreglo3(){
		 		
		 	//Aqui viene la parte de la detección de los colores
				//Listas de datos para almacenar los colores que hay en cada centro (celda) por Canal 
				    var arregloListaR3 = new Array(16);
				    var arregloListaG3 = new Array(16);
				    var arregloListaB3 = new Array(16);

				    var Tablero3 = [
				    [3,3,3,3],
				    [3,3,3,3],
				    [3,3,3,3],
				    [3,3,3,3]
				    ];
				    //arreglo de 4x4 que representa el tablero de juego. Los valores que debe contener están entre 0 y 3. El valor de cada celda depende de lo que hay en ella, se especifica abajo
				    
				    //0 = rojo ->ficha de la máquina
				    //1 = azul ->ficha del contrincante
				    //2 = verde ->celda de la máquina
				    //3 = negro ->celda del contrincante

				    var imageData = contextArreglo3.getImageData( 0, 0, canvasArreglo3.width, canvasArreglo3.height),

					    //var imageData = app.getImgData(),
				        pixels = imageData.data,
				        numPixels = imageData.width * imageData.height;
						console.log(imageData);
					 	console.log(pixels[0]);

					 	var horizontal3=0;//se itera para moverse en horizontal 
					 	var vertical3=1;//se itera para moverse en vertical
					 	var miArreglo3=0;//iterador para almacenar los datos en los arregloLista

					    for ( var i = 0; i < numPixels; i++ ) 
					    {

					        var a =((11593*vertical3)-(43*(vertical3-1))+(87*horizontal3));
					        //console.log(a);
					      if(i== a)
					        {
					        arregloListaR3[miArreglo3]=pixels[ i * 4 ];
					        arregloListaG3[miArreglo3]=pixels[ i * 4 + 1 ];
							arregloListaB3[miArreglo3]=pixels[ i * 4 + 2 ];
 							miArreglo3++;
					        	console.log(a);
					        /*pixels[ i * 4 ] = 255;
					        pixels[ i * 4 + 1 ] = 255;
					        pixels[ i * 4 + 2 ] = 0;*/
					        horizontal3++;
						        if(horizontal3>3)
						        {
						        	horizontal3=0;
						        	vertical3+=2;
						        }
					        } 
					    }
					 
					    contextArreglo3.putImageData( imageData, 0, 0 );//trabajar con el context inicial que es el que ya está cargado 

					    console.log(arregloListaR3);
					    console.log(arregloListaG3);
					    console.log(arregloListaB3);

					    //variables para llenar el tablero
					    var m=0;
					    var n=0;

					    //variable ayudante para llenar el tablero
					    var k=1;

					    //for para identificar el color de cada celda
					    for(var t=0; t<16; t++)
					    {
					    	var valorCelda3=5; //este es el valor que va a ir en cada celda

					    	//comparar los colores para saber cual color está en esa celda
					    	

					    	if( arregloListaR3[t]>arregloListaG3[t] && arregloListaR3[t]>arregloListaB3[t] && arregloListaR3[t]>=70)
					    	{
					    		valorCelda3=0; //rojo
					    	}

					    	if(arregloListaG3[t]>arregloListaR3[t] && arregloListaG3[t]>arregloListaB3[t] && arregloListaG3[t]>=70){
					    		valorCelda3=2; //verde
					    	}

					    	if( arregloListaB3[t]>arregloListaR3[t] && arregloListaB3[t]>arregloListaG3[t] && arregloListaB3[t]>=70){
					    		valorCelda3=1; //azul
					    	}

					    	if(arregloListaR3[t] <60 && arregloListaG3[t] <60 && arregloListaB3[t] <60){
					    		valorCelda3=3; //negro
					    	}



					    	Tablero3[m][n]=valorCelda3;
					    	console.log(m+" "+" "+n);
					    	console.log(t);
					    	console.log(valorCelda3);

					    	n++;
					    	if(t==(3*k+(k-1)))
					    	{
					    		n=0;
					    		m++;
					    		k++;
					    	}

					    	

					    }


					    console.log(Tablero3);

					    //llenar granTablero
					    for(var h=0; h<4;h++)
					    {
					    	for(var w=0;w<4;w++)
					    	{
					    		granTablero[w+4][h]=Tablero3[w][h];
					    	}
					    }
		 }

		 function arreglo4(){
		 		
		 	//Aqui viene la parte de la detección de los colores
				//Listas de datos para almacenar los colores que hay en cada centro (celda) por Canal 
				    var arregloListaR4 = new Array(16);
				    var arregloListaG4 = new Array(16);
				    var arregloListaB4 = new Array(16);

				    var Tablero4 = [
				    [3,3,3,3],
				    [3,3,3,3],
				    [3,3,3,3],
				    [3,3,3,3]
				    ];
				    //arreglo de 4x4 que representa el tablero de juego. Los valores que debe contener están entre 0 y 3. El valor de cada celda depende de lo que hay en ella, se especifica abajo
				    
				    //0 = rojo ->ficha de la máquina
				    //1 = azul ->ficha del contrincante
				    //2 = verde ->celda de la máquina
				    //3 = negro ->celda del contrincante

				    var imageData = contextArreglo4.getImageData( 0, 0, canvasArreglo4.width, canvasArreglo4.height),

					    //var imageData = app.getImgData(),
				        pixels = imageData.data,
				        numPixels = imageData.width * imageData.height;
						console.log(imageData);
					 	console.log(pixels[0]);

					 	var horizontal4=0;//se itera para moverse en horizontal 
					 	var vertical4=1;//se itera para moverse en vertical
					 	var miArreglo4=0;//iterador para almacenar los datos en los arregloLista

					    for ( var i = 0; i < numPixels; i++ ) 
					    {

					        var a =((11593*vertical4)-(43*(vertical4-1))+(87*horizontal4));
					        //console.log(a);
					      if(i== a)
					        {
					        arregloListaR4[miArreglo4]=pixels[ i * 4 ];
					        arregloListaG4[miArreglo4]=pixels[ i * 4 + 1 ];
							arregloListaB4[miArreglo4]=pixels[ i * 4 + 2 ];
 							miArreglo4++;
					        	console.log(a);
					        /*pixels[ i * 4 ] = 255;
					        pixels[ i * 4 + 1 ] = 255;
					        pixels[ i * 4 + 2 ] = 0;*/
					        horizontal4++;
						        if(horizontal4>3)
						        {
						        	horizontal4=0;
						        	vertical4+=2;
						        }
					        } 
					    }
					 
					    contextArreglo4.putImageData( imageData, 0, 0 );//trabajar con el context inicial que es el que ya está cargado 

					    console.log(arregloListaR4);
					    console.log(arregloListaG4);
					    console.log(arregloListaB4);

					    //variables para llenar el tablero
					    var m=0;
					    var n=0;

					    //variable ayudante para llenar el tablero
					    var k=1;

					    //for para identificar el color de cada celda
					    for(var t=0; t<16; t++)
					    {
					    	var valorCelda4=5; //este es el valor que va a ir en cada celda

					    	//comparar los colores para saber cual color está en esa celda
					    	

					    	if( arregloListaR4[t]>arregloListaG4[t] && arregloListaR4[t]>arregloListaB4[t] && arregloListaR4[t]>=70)
					    	{
					    		valorCelda4=0; //rojo
					    	}

					    	if(arregloListaG4[t]>arregloListaR4[t] && arregloListaG4[t]>arregloListaB4[t] && arregloListaG4[t]>=70){
					    		valorCelda4=2; //verde
					    	}

					    	if( arregloListaB4[t]>arregloListaR4[t] && arregloListaB4[t]>arregloListaG4[t] && arregloListaB4[t]>=70){
					    		valorCelda4=1; //azul
					    	}

					    	if(arregloListaR4[t] <60 && arregloListaG4[t] <60 && arregloListaB4[t] <60){
					    		valorCelda4=3; //negro
					    	}



					    	Tablero4[m][n]=valorCelda4;
					    	console.log(m+" "+" "+n);
					    	console.log(t);
					    	console.log(valorCelda4);

					    	n++;
					    	if(t==(3*k+(k-1)))
					    	{
					    		n=0;
					    		m++;
					    		k++;
					    	}

					    	

					    }


					    console.log(Tablero4);

					    //llenar granTablero
					    for(var h=0; h<4;h++)
					    {
					    	for(var w=0;w<4;w++)
					    	{
					    		granTablero[w+4][h+4]=Tablero4[w][h];
					    	}
					    }
		 }

		 function granArreglo(){
		 	console.log(granTablero);
		 }
		 