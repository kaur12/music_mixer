(() => {

	// Variables are defined here

	const instruments = ["guitar", "flute", "piano", "tambourine"];

	var instrumentSelector = document.querySelectorAll("#iconSelect img");
	var iconDisplay = document.querySelector("#icons");

	let dropZones = document.querySelectorAll(".drop-zone");

  
	// Functions go here

	function displayVariants (iconIndex) {
		// Display variants of each instrument on the left side
		instruments.forEach((instrument, index) => {
			let instrumentIcon = `<img draggable id="${instruments[iconIndex] + index}" class="instrumentVariant" src="images/${instruments[iconIndex] + index}.svg" alt="Instrument Variants">`;

			iconDisplay.innerHTML += instrumentIcon; 
		});

		initDrag();
	}

	// Drag and Drop code

	function initDrag() {
		iconDisplay.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {

				e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}

	// Drag-Over and Drop functions

	dropZones.forEach(zone => {
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
		});

		zone.addEventListener("drop", function(e) {
			// Prevents adding multiple instruments to same dropzone
			if (!zone.innerHTML) {
			let instrument = e.dataTransfer.getData("text/plain");
			e.target.appendChild(document.querySelector(`#${instrument}`));
			playAudio(instrument);
		}
		else {
			return;
		}
		});
	});

	function playAudio(audiofiles){
		const audioTrack = document.querySelector(`[data-ref="${audiofiles}"]`);
		console.log(audioTrack);
		audioTrack.play();
	}


	function resetVariants() {
		// removes the instrument variants to display new ones
		iconDisplay.innerHTML = "";
		displayVariants(this.dataset.instrumentref);
	}

	// Event Handling below this

	instrumentSelector.forEach(instrument => instrument.addEventListener("click", resetVariants));

	displayVariants(0);

})();

