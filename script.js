// Do not remove this line
const prompt = require("syncprompt");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Constants for 2D array
const YEAR = 0;
const MAKE = 1;
const MODEL = 2;

// Constants for inventory size
const MAX_VEHICLES = 100;

// variables for inventory
let inventory = [];
let vehicleCount = 0;

// Function prototypes
function printMenu() {
	console.log("Car Dealership Inventory System");
	console.log("1. Add Vehicle");
	console.log("2. Remove Vehicle");
	console.log("3. View Inventory");
	console.log("4. Quit");
}

function getUserSelection(callback) {
	rl.question("Enter your choice (1-4): ", (selection) => {
		callback(parseInt(selection));
	});
}

function handleUserSelection(selection) {
	switch (selection) {
		case 1:
			addVehicle();
			break;
		case 2:
			removeVehicle();
			break;
		case 3:
			viewInventory();
			break;
		case 4:
			console.log("Quitting program.");
			rl.close();
			break;
		default:
			console.log("Invalid selection. Please try again.");
			startInteractionLoop();
			break;
	}
}

function addVehicle() {
	if (vehicleCount >= MAX_VEHICLES) {
		console.log("Inventory full. Cannot add more vehicles.");
		startInteractionLoop();
		return;
	}

	rl.question("Enter year: ", (year) => {
		rl.question("Enter make: ", (make) => {
			rl.question("Enter model: ", (model) => {
				inventory[vehicleCount] = [year, make, model];
				vehicleCount++;
				console.log("Vehicle added successfully.");
				startInteractionLoop();
			});
		});
	});
}

function removeVehicle() {
	rl.question(
		"Enter the index of the vehicle to remove (0-" + (vehicleCount - 1) + "): ",
		(index) => {
			index = parseInt(index);

			if (index < 0 || index >= vehicleCount) {
				console.log("Invalid index. No vehicle removed.");
				startInteractionLoop();
				return;
			}

			for (let i = index; i < vehicleCount - 1; i++) {
				inventory[i] = inventory[i + 1];
			}

			vehicleCount--;
			console.log("Vehicle removed successfully.");
			startInteractionLoop();
		},
	);
}

function viewInventory() {
	if (vehicleCount === 0) {
		console.log("Inventory is empty.");
	} else {
		console.log("Current Inventory:");
		for (let i = 0; i < vehicleCount; i++) {
			console.log(
				`${i}: Year: ${inventory[i][YEAR]}, Make: ${inventory[i][MAKE]}, Model: ${inventory[i][MODEL]}`,
			);
		}
	}
	startInteractionLoop();
}

function startInteractionLoop() {
	printMenu();
	getUserSelection(handleUserSelection);
}

// Start the interaction loop
startInteractionLoop();
