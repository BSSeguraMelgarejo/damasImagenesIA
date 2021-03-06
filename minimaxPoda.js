function minimaxPoda()
{

	//crear la clase pila para hacer objetos de tipo pila
		class Pila {
		constructor(){
			this.items = {};
			this.top=0;
		};

		ingresar(dato){
			this.top++;
			this.items[this.top]=dato;
		};

		sacar(){
		let eliminarDato;
			if(this.top){
				eliminarDato = this.items[this.top];
				delete this.items[this.top];
				this.top--;
				return eliminarDato;
			};
		};

		tamanio(){
			return this.top;
		};

		vacia(){
			if(!this.tamanio())
			{
			return true;
			}else{
				return false;
			}
		};

		ultimoValor(){
			if(this.vacia())
			{
				return null;
			}else{
				return this.items[this.top];
			}
		};

		mostrar(){
			let result = '';
			for(let i = this.top; i>0; i--){
				result += this.items[i] + ' ';
			}
			return result;
		};

	};

	class Cola{
		constructor(){
			this.items = {};//ESTA ES LA COLA -> aqui esta toda la información de la cola
			this.front=0;//frente de la fila
			this.end=0;//final de la fila 
		};

		ingresar(dato){//ingresar un dato a la cola
		this.items[this.end] = dato;//de toda la nformación que esta en la cola, tomar el final e igualarlo al dato ingresado
		this.end++;//ingrementar el final de la fila -> porque ingresa por la COLA
		};

		sacar(){//sacar un dato de la cola
			if(this.front==this.end){
				return null;//si no hay nada en la cola, retorne null
			}
			else{
			const dato = this.items[this.front]; //crear un dato que sea igual al frente de la cola, es decir al primer dato de la cola
			this.front++;//mover el frente de la cola
			return dato;//retornar el dato 
			}
			
		};

		tamanio(){//conocer el tamaño de la cola
			return this.end - this.front;//posición final - posición inicial de la cola
		};

		vacia(){//saber si está o no vacía
			if(this.tamanio()==0){
				return true;//si la cola está vacía
			}else{
				return false;//si la cola NO está vacía
			}
		};

		primerValor(){//para obtener el primer valor de la Cola
			if(this.vacia()){//si la cola está vacía no hay nada que retornar
				return null;
			}else{
			return this.items[this.front];
			}
		};


		mostrar(){//imprimir todos los valores de la cola
			if(this.vacia()){
				return null;
			}
			//la variable de tipo let muere cuando sale de la funcion mostrar, es una variable de ayuda dentro de los corchetes donde es creada
			/*let resultado = '';//crear una lista vacía
			for(let i=0, i < this.end; i++)
			{
				resultado += this.items[i] + ", ";
			}

			return resultado;*/

			else{
				let resultado = '';//crear una lista vacía
				for(var i=this.front; i<this.end; i++)
				{
					resultado += "[" + this.items[i] + "]";
				}

				return resultado;
			}
		};
	};


	//variable global para conocer el numero de contrincantes
	var numeroContrincante=0;
	//cola para almacenar los contrincantes
	var fichasContrincante = new Cola;
	//cola para almacenar los contrincantes
	var estadosMin = new Cola;
	//cola para almacenar los nodos (con valor y estado) de cada movimiento del contrincante
	var estadosMinValorCola = new Cola;

	//funcion para almacenar las fichas contrincantes y saber que número de ficha son y en qué posición están
	function fichasContrincantes(numeroContrincante, xContrincante, yContrincante)
	{
		this.numeroContrincante=numeroContrincante;
		this.xContrincante=xContrincante;
		this.yContrincante=yContrincante;
	}
	//funcion para almacenar los estados Min, es decir, los que son del contrincante y están en el segundo nivel
	function movimientosContrincante(valor, estado)
	{
		this.valor=valor;
		this.estado=estado;
	}

	//funcion para almacenar los estados Max, es decir, los que son propias y están en el tercer nivel
	function movimientosPropia(valor, estado)
	{
		this.valor=valor;
		this.estado=estado;
	}

	//funcion para evaluar el valor de un estado, se le da el valor de acuerdo a los criterios mencionados abajo
	function evaluarEstado(estado)
	{
		//criterios de evaluación
		//fichasPropias-fichasContrincante
		//fichas del exterior valen 4, más interior valen 3, más interior valen 2 y más interior vale 1
		//a la de dios
		//console.log(estado);

		//cuenta las fichas propias
		var Propias=0;
		//cuenta las fichas del contrincante
		var Contrincante=0;

		//cuenta las fichas propias, añadiendo el valor para el segundo caso 
		var Propias2=0;

		//cuenta las fichas del contrincante, añadiendo el valor para el segundo caso
		var Contrincante2=0;
		//for para recorrer el estado (tablero)
		for(var i=0; i<8; i++)
		{
			for(var j=0; j<8; j++)
			{	//si la celda es 1, es decir, si encuentra un contrario
				if(estado[i][j]==1)
				{
					Contrincante++;//aumenta el número de contrincante

					if(i==0 || i==7 || j==0 || j==7)//si esta en el cuadrado externo
					{
						Contrincante2+=4;
					}
					else if(i==1 || i==6 || j==1 || j==6){
						Contrincante2+=3;
					}
					else if(i==2 || i==5 || j==2 || j==5){
						Contrincante2+=2;
					}
					else if(i==3 || i==4 || j==3 || j==4){
						Contrincante2+=1;
					}
				}

				if(estado[i][j]==0)//si la celda es 0, es decir, si encuentra un propio
				{
					Propias++;//aumenta el número de propias

					if(i==0 || i==7 || j==0 || j==7)//si está en el cuadrado externo
					{
						Propias2+=4;
					}
					else if(i==1 || i==6 || j==1 || j==6){
						Propias2+=3;
					}
					else if(i==2 || i==5 || j==2 || j==5){
						Propias2+=2;
					}
					else if(i==3 || i==4 || j==3 || j==4){
						Propias2+=1;
					}
				}
			}
		}

		if(Contrincante-Propias != 0)//si cumple con el primer criterio
		{
			return Contrincante-Propias;
		}else //if(Propias2-Contrincante2 != 0){//si no cumple con el primer, pero si con el segundo criterio
			return Contrincante2-Propias2;
		//}else{//si no cumple ninguno de los dos criterios
			//aleatorio entre 0 y 1, multimplicado por 30
			/*var num = Math.random()*30;//aleatorio hasta 27, porque 32 (8x4) es el mayor que podría alcanzar en este término si no fuera aleatorio
			//redondear el aleatorio y retornarlo
			return Math.floor(num); 
		}*/

	}

	//función que decide si, dados dos valores de estados, se aplica o no la poda
	function podaMin(valorMinimo, valorActual)
	{	
		//aplicar la poda
		if(valorMinimo>valorActual)
			return true;
		//no aplicar la poda
		else
			return false;

	}

	//funcion min, aplicada a una cola de estados max
	function Min(colaDeEstadosMax)
	{
		//con un for recorrer todos los nodos de la colaDeEstadosMax y retornar el minimo
		//se debe retornar el objeto completo, con el valor y el estado
		//inicialmente igualado a cero, pero luego será igualado a un estado
		var minimoElegido=0;
		//crear un valor minimo e igualarlo a un numero muy grande para empezar a evaluar
		var valorMinimo=100;
		for(var p=0; p<colaDeEstadosMax.tamanio(); p++)//for para recorrer la cola de estados max
		{	
			try{
				if(colaDeEstadosMax.items[p].valor<valorMinimo)//si el valor encontrado es menor al valorMinimo
				{
						valorMinimo = colaDeEstadosMax.items[p].valor;//ahora hay un nuevo valorMinimo
						minimoElegido = colaDeEstadosMax.items[p];//igualar al esyado que tiene ese valor
				}
			}catch(err){
				console.log(err.message);
			}
		}
		console.log("*****************VALOR MINIMO ELEGIDO EN EL Min*****************");
		console.log(minimoElegido);
		return minimoElegido;//retormar el estado minimoElegido
	}

	//funcion Max, aplicada a una cola de estados min
	function Max(colaDeEstadosMin)
	{
		//con un for recorrer todos los nodos de la colaDeEstadosMin y retornar el máximo
		//se debe retornar el objejo complato, con el valor y el estado
		var maximoElegido = JSON.parse(JSON.stringify(colaDeEstadosMin));

		//el valor máximo inicia siento un valor muy bajito y cambiará en el for
		var valorMaximo=-100;
		for(var p=0; p<colaDeEstadosMin.end; p++)//for para recorrer la cola de estados min
		{	
			try{
				if(colaDeEstadosMin.items[p].valor>valorMaximo)//si encuentra un valor mayor
				{
						valorMaximo = colaDeEstadosMin.items[p].valor;//hay un nuevo valorMaximo
						maximoElegido = colaDeEstadosMin.items[p];//igualar el Maximo al estado con ese valor
				}
			}catch(err){
				console.log(err.message);
			}
		}
		console.log("*****************VALOR MAXIMO ELEGIDO EN EL Max*****************");
		console.log(maximoElegido);
		return maximoElegido;//retornar el máximo elegido
	}

		//dado este tablero
		/*var granTablero = [
		    [3,2,3,2,3,2,3,2],
		    [2,3,2,1,2,1,2,1],
		    [1,2,1,2,3,2,0,2],
		    [2,3,2,1,2,3,2,1],
		    [3,2,3,2,3,2,3,2],
		    [2,3,2,3,2,3,2,3],
		    [3,2,3,2,0,2,3,2],
		    [2,3,2,0,2,0,2,0]
		    ];*/

	//var encontradoContrincante = new fichasContrincantes(numeroContrincante, xContrincante, yContrincante);

	//recorrer el tablero para encontrar los 1 es decir, las casillas donde está el contrincante
	//cada vez que se encuentra un contrincante, meterlo en la lista de fichasContrincante
	//cada vez que se encuentra un contrincante, saber cuales pueden ser sus movimientos, y cada uno de esos movimientos, meterlos en la lista de estadosMin, todos esos serán los estados del segundo nivel del arbol

	for(var i=0; i<8; i++)//for para recorrer el tablero de 8x8
	{
		for(var j=0; j<8;j++)
		{
			var celdaActual=granTablero[i][j];//celda actual

			//si encuentra una ficha contrincante
			if(celdaActual==1)
			{
				console.log("Encontrado Contrincante");

				//aumentar el numero de contrincantes encontrados
				numeroContrincante++;

				//coordenadas de la ficha encontrada
				var xContrincante=i;
				var yContrincante=j;

				console.log(xContrincante+" "+yContrincante);
				/*console.log("mover a la izquierda");
				console.log((xContrincante-1) +" "+ (yContrincante+1));
				console.log(granTablero[i][j]);*/

				//crear un nuevo elemento que contenga las coordenadas y el numero de contrincante
				var encontradoContrincante = new fichasContrincantes(numeroContrincante, xContrincante, yContrincante);
				//ingresar a la cola de fichas contrincante, NO A LA DE ESTADOS, SINO A LA DE FICHAS
				fichasContrincante.ingresar(encontradoContrincante);

				
				
				try{
					//Comer si abajo a la izq hay un propio y abajo abajo izq izq no hay nada
					if((xContrincante<6 && yContrincante>1) && (granTablero[xContrincante+1][yContrincante-1]==0) && (granTablero[xContrincante+2][yContrincante-2]==3))
					{

						//copia del granTablero para hacer las modificaciones
						var granTableroCopia3 = JSON.parse(JSON.stringify(granTablero));

						console.log("comer abajo izq");
						granTableroCopia3[xContrincante+2][yContrincante-2]=1;
						granTableroCopia3[xContrincante+1][yContrincante-1]=3;
						granTableroCopia3[xContrincante][yContrincante]=3;

						//crear un nuevo elemento que contenga el valor y el estado que se expandido
						var valorActual=null;
						var nuevoTableroMin = new movimientosContrincante(valorActual,granTableroCopia3);

						estadosMinValorCola.ingresar(nuevoTableroMin);

						estadosMin.ingresar(granTableroCopia3);
					}
				}catch(err){
					console.log(err.message);
				}
				
				try{
					//Comer si abajo a la der hay un propio y abajo abajo der der no hay nada
					if((xContrincante<6 && yContrincante<6) && (granTablero[xContrincante+1][yContrincante+1]==0) && (granTablero[xContrincante+2][yContrincante+2]==3))
					{

						//copia del granTablero para hacer las modificaciones
						var granTableroCopia4 = JSON.parse(JSON.stringify(granTablero));

						console.log("comer abajo der");
						granTableroCopia4[xContrincante+2][yContrincante+2]=1;
						granTableroCopia4[xContrincante+1][yContrincante+1]=3;
						granTableroCopia4[xContrincante][yContrincante]=3;

						//crear un nuevo elemento que contenga el valor y el estado que se expandido
						var valorActual=null;
						var nuevoTableroMin = new movimientosContrincante(valorActual,granTableroCopia4);

						estadosMinValorCola.ingresar(nuevoTableroMin);

						estadosMin.ingresar(granTableroCopia4);
					}	
				}catch(err){
					console.log(err.message);
				}

				//Hacer el movimiento si abajo a la izq no hay nada y queda dentro del tablero
				try{
					if(xContrincante<7 && yContrincante>0 && granTablero[xContrincante+1][yContrincante-1]==3)
					{
						//copia del granTablero para hacer las modificaciones
						var granTableroCopia = JSON.parse(JSON.stringify(granTablero));

						console.log("movimiento abajo izq");
						granTableroCopia[xContrincante+1][yContrincante-1]=1;
						granTableroCopia[xContrincante][yContrincante]=3;

						//crear un nuevo elemento que contenga el valor y el estado que se expandido
						var valorActual=null;
						var nuevoTableroMin = new movimientosContrincante(valorActual,granTableroCopia);

						estadosMinValorCola.ingresar(nuevoTableroMin);

						estadosMin.ingresar(granTableroCopia);
					}
				}catch(err){
					console.log(err.message);
				}
				
				try{//Hacer el movimiento si abajo a la der no hay nada y queda dentro del tablero
					if(xContrincante<7 && yContrincante<7 && granTablero[xContrincante+1][yContrincante+1]==3)
					{
						//copia del granTablero para hacer las modificaciones
						var granTableroCopia2 = JSON.parse(JSON.stringify(granTablero));

						console.log("movimiento abajo der");
						granTableroCopia2[xContrincante+1][yContrincante+1]=1;
						granTableroCopia2[xContrincante][yContrincante]=3;

						//crear un nuevo elemento que contenga el valor y el estado que se expandido
						var valorActual=null;
						var nuevoTableroMin = new movimientosContrincante(valorActual,granTableroCopia2);

						estadosMinValorCola.ingresar(nuevoTableroMin);

						estadosMin.ingresar(granTableroCopia2);
					}
				}catch(err){
					console.log(err.message);
				}
				
			}

		}
	}

	//mostrar los contrincantes encontrados
	console.log(fichasContrincante);

	//mostrar los granTableroCopia
	console.log(granTableroCopia);
	console.log(estadosMin);

	console.log("--------------------- ESTADOS MIN VALOR COLA -------------------");
	console.log(estadosMinValorCola);

	//lista para almacenar los nodos de estados max con su tablero y su valor
	estadosMaxValorCola=new Cola;

	//lista para almacenar los estados max
	estadosMax=new Cola;

	//expandir el primer hijo
	//evaluar cada uno de los nietos y meterlos en la lista estadosMax
	//elegir el menor de esos nietos

	//copia del primer hijo para modificaciones
	var primerHijoCopia = JSON.parse(JSON.stringify(estadosMinValorCola.items[0].estado));
	console.log("primerHijoCopia");
	console.log(primerHijoCopia);

	//for de 8x8 para saber cuantas fichas propias hay
	for(var i=0; i<8; i++)
	{
		for(var j=0; j<8; j++)
		{
			//variable para conocer la celdaActual;
			var celdaActual=primerHijoCopia[i][j];

			if(celdaActual==0)//si encuentra una ficha propia
			{
				console.log("Encontrado Propio");
				console.log(i+" "+j);

				var xPropia = i;
				var yPropia = j;
				//ahora que encontró una ficha propia, conocer sus posibles movimientos o comidas y darle valor a cada estado 

				try{
					//comer a la izq izq arriba arriba
					if(xPropia>0 && yPropia>0 && primerHijoCopia[xPropia-1][yPropia-1]==1 && primerHijoCopia[xPropia-2][yPropia-2]==3)
					{
						//copia del primerHijoCopia para hacer las modificaciones
						var miTableroCopia3 = JSON.parse(JSON.stringify(primerHijoCopia));

						console.log("comer arriba izq");
						miTableroCopia3[xPropia-2][yPropia-2]=0;
						miTableroCopia3[xPropia-1][yPropia-1]=3;
						miTableroCopia3[xPropia][yPropia]=3;

						//crear un nuevo elemento que contenga el valor y el estado que se expandido
						var valorActual=evaluarEstado(miTableroCopia3);
						var nuevoTableroMax = new movimientosPropia(valorActual,miTableroCopia3);

						estadosMaxValorCola.ingresar(nuevoTableroMax);

						estadosMax.ingresar(miTableroCopia3);
					}
				}catch(err){
					console.log(err.message);
				}

				try{
					//comer a la der der arriba arriba
					if(xPropia>1 && yPropia<6 && primerHijoCopia[xPropia-1][yPropia+1]==1 && primerHijoCopia[xPropia-2][yPropia+2]==3)
					{
						//copia del primerHijoCopia para hacer las modificaciones
						var miTableroCopia4 = JSON.parse(JSON.stringify(primerHijoCopia));

						console.log("comer arriba der");
						miTableroCopia4[xPropia-2][yPropia+2]=0;
						miTableroCopia4[xPropia-1][yPropia+1]=3;
						miTableroCopia4[xPropia][yPropia]=3;

						//crear un nuevo elemento que contenga el valor y el estado que se expandido
						var valorActual2=evaluarEstado(miTableroCopia4);
						var nuevoTableroMax = new movimientosPropia(valorActual2,miTableroCopia4);

						estadosMaxValorCola.ingresar(nuevoTableroMax);

						estadosMax.ingresar(miTableroCopia4);
					}
				}catch(err){
					console.log(err.message);
				}

				try{
					//moverse a la izq arriba
					if(xPropia>0 && yPropia>0 && primerHijoCopia[xPropia-1][yPropia-1]==3)
					{
						//copia del primerHijoCopia para hacer las modificaciones
						var miTableroCopia = JSON.parse(JSON.stringify(primerHijoCopia));

						console.log("movimiento arriba izq");
						miTableroCopia[xPropia-1][yPropia-1]=0;
						miTableroCopia[xPropia][yPropia]=3;

						//crear un nuevo elemento que contenga el valor y el estado que se expandido
						var valorActual3=evaluarEstado(miTableroCopia);
						var nuevoTableroMax = new movimientosPropia(valorActual3,miTableroCopia);

						estadosMaxValorCola.ingresar(nuevoTableroMax);

						estadosMax.ingresar(miTableroCopia);
					}
				}catch(err){
					console.log(err.message);
				}

				try{
					//moverse a la der arriba
					if(xPropia>0 && yPropia<7 && primerHijoCopia[xPropia-1][yPropia+1]==3)
					{
						//copia del primerHijoCopia para hacer las modificaciones
						var miTableroCopia2 = JSON.parse(JSON.stringify(primerHijoCopia));

						console.log("movimiento arriba der");
						miTableroCopia2[xPropia-1][yPropia+1]=0;
						miTableroCopia2[xPropia][yPropia]=3;

						//crear un nuevo elemento que contenga el valor y el estado que se expandido
						var valorActual4=evaluarEstado(miTableroCopia2);
						var nuevoTableroMax = new movimientosPropia(valorActual4,miTableroCopia2);

						estadosMaxValorCola.ingresar(nuevoTableroMax);

						estadosMax.ingresar(miTableroCopia2);
					}
				}catch(err){
					console.log(err.message);
				}
			}
		}
	}

	console.log("--------------------------- estadosMaxValorCola -----------------------------------");
	console.log(estadosMaxValorCola);

	//ahora que tiene los valores de los nodos hoja del primerhijo, se puede elegir el mínimo
	//analizar con las pruebas, si es mejor elegir el mínimo y no el máximo
	var minimoActualValor = 1000;
	var minimoActualEstado = new Array;

	console.log(minimoActualValor);
	for(var k=0; k<estadosMaxValorCola.tamanio(); k++)//for para encontrar el minimo de la cola de maximos
	{
		if(estadosMaxValorCola.items[k].valor<minimoActualValor)//si encuentra un menor
		{	
			minimoActualValor = JSON.parse(JSON.stringify(estadosMaxValorCola.items[k].valor));//crear un nuevo valor minimo que almacene su valor
			minimoActualEstado= JSON.parse(JSON.stringify(estadosMaxValorCola.items[k].estado));//crear un nuevo tablero minimo que almacene ese tablero
		}
	}

	//funcion para vaciar la cola de hojas con el fin de llenarla nuevamente en cada iteración al hacer el algoritmo pertinente
	function vaciarCola(colaAnterior){
		//tañano de la cola anterior
		var tAnterior = JSON.parse(JSON.stringify(colaAnterior.tamanio()));
		//la cola nueva es una copia de la cola anterior, que entra como protitipo de vaciarCola
		var colaNueva = JSON.parse(JSON.stringify(colaAnterior));

		//for para eliminar los items de las cola 
		for(var x=0; x<tAnterior;x++)
		{
			delete colaNueva.items[x];//eliminar los items de la colaNueva
		}

		//dejar el final de la cola nueva en 0
		colaNueva.end=0;

		//mostrar por consola las colas para comparar
		console.log("cola anterior ");
		console.log(colaAnterior);

		console.log("cola nueva ");
		console.log(colaNueva);

		//retornar la colaNuena, con la que se va a trabajar
		return colaNueva;	
	}


	console.log("*******************************************************");
	console.log(estadosMaxValorCola);

	//variable que confirma que se aplicó la poda, será usada en el for me más abajo
	var podaAplicada=false;

	//----------------------------------------------------------------------------------------------------------------------------------A partir de aqui se empieza a usar el minimax y la poda alpha beta

	//El algoritmo acaba cuando se recorren todos los nodos Min (segundo nivel)
	//desde 1 porque el 0 ya se evaluo

	//crear una copia de la cola de estados min
	var estadosMinCopia = JSON.parse(JSON.stringify(estadosMinValorCola));
	console.log("---------------------------------------- ESTADOS MIN COPIA -----------------------------------**************************************************");
	console.log(estadosMinCopia);
	//hacer una segunda Copia para hacer cambios solo con los valores (que es lo que realmente importa) y dejar los estados que ya existen
	var estadosMinCopia2 = JSON.parse(JSON.stringify(estadosMinCopia));
	//por eso solo hay cambio de valor y NO HAY CAMBIO DE ESTADO
	estadosMinCopia2.items[0].valor=minimoActualValor;
	console.log("---------------------------------------- ESTADOS MIN COPIA2 -----------------------------------**************************************************");
	console.log(estadosMinCopia2);

	//para todos los movimientos que se pueden hacer con estadoMinCopia2 (todos los items) expandirlos
	//a cada expandido, darle un valor
	//ese valor darselo al padre
	//mostrar nuevamente estadosMinCopia2

	//funcion que aplica el minimax en la cola de valores min. Determina y retorna el menor 
	function valorMin(cola)
	{
		var minimoActual=100;
		const miTamanio=JSON.parse(JSON.stringify(cola.end));
		for(var i=0; i<miTamanio;i++){
			if(cola.items[i]<minimoActual)
			{
				minimoActual=cola.items[i];
			}
		}

		return minimoActual;
	}

	//desde k=1 porque el primero ya tiene valor
	const t=JSON.parse(JSON.stringify(estadosMinCopia.end));
	for(var k=0; k<t;k++)
	{	
		//cola para los valores max
		var valoresMax= new Cola;
		for(var i=0; i<8; i++)
		{
			for(var j=0; j<8; j++)
			{
				//variable para conocer la celdaActual;
				var celdaActual=estadosMinCopia2.items[k].estado[i][j];
				console.log(celdaActual);
				if(celdaActual==0)//si encuentra una ficha propia
				{
					console.log("encontrado propio");

					var xPropia = i;
					var yPropia = j;
					//ahora que encontró una ficha propia, conocer sus posibles movimientos o comidas y darle valor a cada estado 

					try{
						//comer a la izq izq arriba arriba
						if(xPropia>0 && yPropia>0 && primerHijoCopia[xPropia-1][yPropia-1]==1 && primerHijoCopia[xPropia-2][yPropia-2]==3)
						{
							var miTableroCopia3=JSON.parse(JSON.stringify(estadosMinCopia.items[k].estado));

							console.log("comer arriba izq");
							miTableroCopia3[xPropia-2][yPropia-2]=0;
							miTableroCopia3[xPropia-1][yPropia-1]=3;
							miTableroCopia3[xPropia][yPropia]=3;

							//crear un nuevo elemento que contenga el valor y el estado que se expandido
							var valorActual3=evaluarEstado(miTableroCopia3);

							//si esto se cumple, aplicar la poda
							if(podaMin(minimoActualValor, valorActual3))
							{	//salir del for
								i=8;
								j=8;
								//darle un valor muy pequeño al valorMax
								valoresMax.ingresar(-100);
							}
							else{
								valoresMax.ingresar(valorActual3);
							}
							
						}
					}catch(err){
						console.log(err.message);
					}

					try{
						//comer a la der der arriba arriba
						if(xPropia>1 && yPropia<6 && primerHijoCopia[xPropia-1][yPropia+1]==1 && primerHijoCopia[xPropia-2][yPropia+2]==3)
						{
							var miTableroCopia4=JSON.parse(JSON.stringify(estadosMinCopia.items[k].estado));


							console.log("comer arriba der");
							miTableroCopia4[xPropia-2][yPropia+2]=0;
							miTableroCopia4[xPropia-1][yPropia+1]=3;
							miTableroCopia4[xPropia][yPropia]=3;

							//crear un nuevo elemento que contenga el valor y el estado que se expandido
							var valorActual4=evaluarEstado(miTableroCopia4);

							//si esto se cumple, aplicar la poda
							if(podaMin(minimoActualValor, valorActual4))
							{	//salir del for
								i=8;
								j=8;
								//darle un valor muy pequeño al valorMax
								valoresMax.ingresar(-100);
							}
							else{
								valoresMax.ingresar(valorActual4);
							}						
						}
					}catch(err){
						console.log(err.message);
					}

					try{
						//moverse a la izq arriba
						if(xPropia>0 && yPropia>0 && primerHijoCopia[xPropia-1][yPropia-1]==3)
						{

							var miTableroCopia=JSON.parse(JSON.stringify(estadosMinCopia.items[k].estado));

							console.log("movimiento arriba izq");
							miTableroCopia[xPropia-1][yPropia-1]=0;
							miTableroCopia[xPropia][yPropia]=3;

							//crear un nuevo elemento que contenga el valor y el estado que se expandido
							var valorActual=evaluarEstado(miTableroCopia);

							//si esto se cumple, aplicar la poda
							if(podaMin(minimoActualValor, valorActual))
							{	//salir del for
								i=8;
								j=8;
								//darle un valor muy pequeño al valorMax
								valoresMax.ingresar(-100);
							}
							else{
								valoresMax.ingresar(valorActual);
							}
							
						}
					}catch(err){
						console.log(err.message);
					}

					try{
						//moverse a la der arriba
						if(xPropia>0 && yPropia<7 && primerHijoCopia[xPropia-1][yPropia+1]==3)
						{

							var miTableroCopia2=JSON.parse(JSON.stringify(estadosMinCopia.items[k].estado));

							console.log("movimiento arriba der");
							miTableroCopia2[xPropia-1][yPropia+1]=0;
							miTableroCopia2[xPropia][yPropia]=3;

							//crear un nuevo elemento que contenga el valor y el estado que se expandido
							var valorActual2=evaluarEstado(miTableroCopia2);
							
							//si esto se cumple, aplicar la poda
							if(podaMin(minimoActualValor, valorActual2))
							{	//salir del for
								i=8;
								j=8;
								//darle un valor muy pequeño al valorMax
								valoresMax.ingresar(-100);
							}
							else{
								valoresMax.ingresar(valorActual2);
							}
						}
					}catch(err){
						console.log(err.message);
					}
				}
			}
		}


		console.log("---------------------------------------VALORES MAX-------------------------------");
		console.log(valoresMax);
		estadosMinCopia2.items[k].valor=valorMin(valoresMax);
		console.log("---------------------------------------ELECCION-------------------------------");
		console.log(estadosMinCopia2.items[k].valor);
	}

	console.log(estadosMinCopia2);

	console.log("-----------------MEJOR OPCION-------------------");

	var mejorOpcion=Max(estadosMinCopia2);
	console.log(mejorOpcion);

	var miCelda2=1;//acumulador para colorear las celdas

		 	//for para recorrer granTablero y colorearlo en el DOM
		 	for(var i=0; i<8; i++)
		 	{
		 		for(var j=0; j<8; j++)
		 		{

		 			switch(mejorOpcion.estado[i][j]) {
						  case 0:
						    $('.grid-item-2:nth-child('+miCelda2+')').children().css("background-color", "#ff2727cf");
						    break;
						  case 1:
						    $('.grid-item-2:nth-child('+miCelda2+')').children().css("background-color", "#312affcf");
						    break;
						  default:
						    $('.grid-item-2:nth-child('+miCelda2+')').children().css("background-color", "#fff0");
						} 

						miCelda2++;
		 		}
		 	}

}