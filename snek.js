
function createRadio(size, description) {
	let label = document.createElement("label");
	// let text = document.createTextNode(description);
	label.innerHTML = description;
	label.for = `${String(description)}:  `;

	let check = document.createElement("input");
	check.type = "radio";
	check.name = "size";
	check.value = size;
	check.id = description;
	let div = document.createElement("div");
	[label, check].map((item) => {div.appendChild(item)});
	this.appendChild(div);
}

function renderField(numcells) {
	while (this.firstChild) {
		this.removeChild(this.firstChild);
	}
	// const root = document.documentElement;
	// root.style.setProperty("--numcells", numcells);
	var table = document.createElement("table");
	this.appendChild(table);
	table.appendChild(document.createElement("thead"));
	var bod = document.createElement("tbody");
	table.appendChild(bod);
	for (var i = 0; i < numcells; i++) {
		var row = document.createElement("tr");
		bod.appendChild(row);
		for (var n = 0; n < numcells; n++) {
			let sec = document.createElement("td");
			// sec.setAttribute("row", i);
			// sec.setAttribute("column", n);
			sec.setAttribute("id", `${i}${n}`);
			row.appendChild(sec);
		}
	}
	setGame.call(this, numcells);
}

function getRand(min, max) {
	return Math.floor(Math.random() * (max-min)) + min;
}

function isFree(cell, snek) {
	if (!snek.includes(cell)) {
		return true;
	} 
	return false;
}

function getColour (id, colour) {
	let n = document.getElementById(id);
	n.style.backgroundColor = colour;
};

function newApple(numcells, snek) {
	let position = `${getRand(1, numcells)}${getRand(1, numcells)}`
	if (isFree(position, snek)) {
		// console.log("success");
		getColour.call(this, position, "red");
		return position;		
	} 
	// console.log("exception");
	replace = newApple.call(this, numcells, snek);
	return replace;
}

	// }
var XV = 0;
var YV = 0;

function setGame(numcells) {
	var next = "";

	let initial = `${getRand(Math
		.floor(numcells / 2), Math
		.ceil(numcells / 2))}${getRand(Math
			.floor(numcells / 2 - 1), Math
			.ceil(numcells / 2 + 1))}`;

	var snek = [initial, 
	`${Number(initial) - 10}`, 
	`${Number(initial) - 20}`];
	let head = document.getElementById(snek[0])
	head.innerHTML = "&#214;"


	snek.map((item) => 
		getColour(item, "teal"));

	let apple = newApple.call(this, numcells, snek)
	YV = 1;
	// let direction = 4;
	document.addEventListener("keydown", computeDirection);
	playGame(snek, apple, numcells)
}

function computeDirection (event) {
	switch(event.keyCode) {
		case 37:
			XV=-1;YV=0;
			break;
		case 38:
			XV=0;YV=-1;
			break;
		case 39:
			XV=1;YV=0;
			break;
		case 40:
			XV=0;YV=1;
	}	
}

function computeNext (snek, numcells) {
	let next = snek[0];
	
	next = `${Number(next[0]) + YV}${Number(next[1]) + XV}`
	// коррекция
	if (next.includes("-1")) {
		next = next.replace("-1", `${numcells-1}`);
	}
	if (next.includes(`${numcells}`)) {
		// console.log("yas")
		next = next.replace(`${numcells}`, `0`);
	}
	return next;
}

function playGame(snek, apple, numcells) {
	// direction = computeDirection(direction);
	let next = computeNext(snek, numcells);
	if (snek.includes(next)) {
		alert("GAME OVER");
		XV=0; YV = 0;
		startMenu(vars)
	}
	var app = apple;
	if (next == apple) {
		document.getElementById(snek[0]).innerHTML = ""
		snek.unshift(next);
		getColour(next, "teal");
		snek.map((item) => getColour(item, "teal"))
		app = newApple(numcells, snek);
		document.getElementById(snek[0]).innerHTML = "&#214;"		
	} else {
		document.getElementById(snek[0]).innerHTML = ""
		snek.unshift(next);
		getColour(next, "teal");
		snek.map((item) => getColour(item, "teal"))
		getColour(snek.pop(), "white");
		document.getElementById(snek[0]).innerHTML = "&#214;"		
	}
	setTimeout(() => {
		playGame(snek, app, numcells)
	}, 200)
	// рекурсивный вызов с обновлёнными аргументами
		
}

function startMenu(vars) {
	let main = document.querySelector(".main");
	while (main.firstChild) {
		main.removeChild(main.firstChild);
	}
	let form = document.createElement("form");
	main.appendChild(form);

	vars.map(([size, description]) => {createRadio
		.call(form, size, description)})

	document.querySelector("#Small").setAttribute("checked", "checked");
	let startButton = document.createElement("button");
	startButton.textContent = "Start";
	main.appendChild(startButton);
	var trgt = document.querySelector("#Small").value;
	form.addEventListener("input", (event) => {
		trgt = event.target.value;
	});
	startButton.addEventListener("click", (event) => {
		renderField.call(main, trgt);
	})
}

var vars = [[6, "Small"], [7, "Medium"], [8, "Large"], [9, "Largest"]];
startMenu(vars)

// function move (next) {
// 	this.push(next);
// 	this.pop();
// }

// function eat (next) {
// 	this.push(next);
// }


	// function check(event) {
	// 	if (event.key == "ArrowLeft") {
	// 		newdir += 1
	// 		console.log("pressed", event.key); 
	// 		console.log("in ", menu.direction);
	// 	}
	// 	if (event.key == "ArrowRight") {
	// 		newdir -= 1
	// 		console.log("pressed", event.key); 
	// 		console.log("in ", menu.direction);		
	// 	}


	//
	// var menu = main = document.querySelector(".main")
	// menu.direction = `${newdir}`;
	// console.log("before", newdir);
	// console.log("before", menu.direction);

	// setTimeout(() => {
	// 	document.removeEventListener("keydown", check, {once:true});
	// }, 600);

		// смена направления по клику кнопки
	// var newdir = direction
	// document.addEventListener("click", function(event) {
	// 	let menu = document.getElementsByTagName("td")
	// 	// if (event.target == menu) {
	// 	newdir += 1;
	// 	newdir = (newdir == 5) ? 1 : (newdir == 0) ? 4 : newdir;
	// 	console.log("in ", newdir);			
	// 	// };
	// }, {once:true});
	// //
	// // console.log("after ", menu.direction);
	// // newdir = Number(menu.direction);
	// console.log("after ", newdir);
	//	
	// return newdir

		// проверка направления, вычисление значений
	// direction == 1 ? 
	// next = (Number(next[0]) + 1) + `${next[1]}` : direction == 2 ? 
	// next = `${next[0]}` + (Number(next[1]) + 1) : direction == 3 ? 
	// next = (Number(next[0]) - 1) + `${next[1]}` : next = `${next[0]}` + (Number(next[1]) - 1);