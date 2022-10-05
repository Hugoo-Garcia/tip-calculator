//TODO: ===== VARIABLES =====

const bill = document.querySelector('#bill');
const tipsOptions = document.querySelectorAll('#tip');
const tipCustom = document.querySelector('#tipCustom');
const people = document.querySelector('#people');
const reset = document.querySelector('#reset');
const tipAmountPerson = document.querySelector('#tip-person');
const totalAmountPerson = document.querySelector('#total-person');

let tips = [];
let tipAmount = 0;

//TODO: ===== EVENTOS =====

eventListeners();
function eventListeners() {
	//? Iterar y seleccionar sobre las opciones por default de las propinas
	tipsOptions.forEach((tip) => {
		tip.addEventListener('click', (e) => {
			e.preventDefault();

			tips = [...tip.innerHTML];
			tips.pop();
			tips = tips.join('');
			tipActivo(tip);
			tips = Number(tips);

			CalcularTip(tips);
			calcularTotal(tipAmount);

			//? Remover el valor del tip personalizado
			tipCustom.value = '';
		});
	});

	//?Tomar el valor de tip personalizado
	tipCustom.addEventListener('change', () => {
		//?Remover la opcion del tip seleccionada
		tipRemove();
		tips = [tipCustom.value];
		tips = tips.join();
		tips = Number(tips);
		CalcularTip(tips);
		calcularTotal(tipAmount);
	});

	//? Actualizar valores cuando el numero de personas se a modificado
	people.addEventListener('change', () => {
		CalcularTip(tips);
		calcularTotal(tipAmount);
	});

	//?Resetear los valores
	reset.addEventListener('click', resetValores);
}

//TODO: ===== FUNCIONES =====

function validarCuenta(e) {
	//? ASCII es la reprsentacion de carateres en dispositivos electronicos
	//? Si el codigo está entre 48 y 57 es un número
	//? 8 es espacio
	//? 46 es punto (.)
	let digits = e.which ? e.which : e.keyCode;

	if (digits === 8) {
		//Espacios
		return true;
	} else if (digits === 46) {
		//Punto
		return true;
	} else if (digits >= 48 && digits <= 57) {
		//Numeros
		return true;
	} else {
		return false;
	}
}

function validarPersona(e) {
	let digits = e.which ? e.which : e.keyCode;

	if (digits >= 48 && digits <= 57) {
		//Numeros
		return true;
	} else {
		return false;
	}
}

function tipActivo(tipActive) {
	tipRemove();
	tipActive.classList.add('bg-teal-500', 'text-teal-900');
}

function tipRemove() {
	tipsOptions.forEach((tip) => {
		if (tip.classList.contains('bg-teal-500', 'text-teal-900')) {
			tip.classList.remove('bg-teal-500', 'text-teal-900');
		}
	});
}

function CalcularTip(tip) {
	tipAmount = (tip * Number(bill.value)) / 100;
	let tipPerson = tipAmount / Number(people.value);
	MostrarTip(tipPerson);
	return tipAmount;
}

function calcularTotal(tipAmount) {
	let total = (tipAmount + Number(bill.value)) / Number(people.value);
	MostrarTotal(total);
	console.log(total);
}

//?Generar el HTML del tip
function MostrarTip(tipPerson) {
	tipAmountPerson.innerHTML = `$${tipPerson.toFixed(2)}`;
}

//?Generar el HTML del total
function MostrarTotal(total) {
	totalAmountPerson.innerHTML = `$${total.toFixed(2)}`;
}

function resetValores() {
	bill.value = '';
	tipsOptions.forEach((tip) => {
		tip.classList.remove('bg-teal-500', 'text-teal-900');
	});
	people.value = 1;
	tipAmountPerson.innerHTML = '0.00';
	totalAmountPerson.innerHTML = '0.00';
}
