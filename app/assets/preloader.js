(function() {
	if(window.location.origin === "http://localhost:3333") {
		document.getElementById('preloader').style.display = 'none';
	}

	console.log(new Date())

	var currentProgress = 0,
		preloaderbar = document.getElementById('loading-bar'),
		preloaderPercent = document.getElementById('loading-percent'),
		preloaderTitle = document.getElementById('preloader-title'),
		preloaderText = document.getElementById('preloader-text'),
		preloaderInterval = setInterval(function(){
			if(currentProgress>=95) {
				clearInterval(preloaderInterval);
				preloaderPercent.innerHTML = '95%';
			} else {
				currentProgress++;
				preloaderPercent.innerHTML = currentProgress + '%';
				preloaderbar.style.width = currentProgress + '%';
			}
			if(currentProgress>=39 && currentProgress<=70) {
				preloaderTitle.innerHTML = 'собираем';
				preloaderText.innerHTML = 'варианты в вашем городе';
			}
			if(currentProgress>=71) {
				preloaderTitle.innerHTML = 'Чистим';
				preloaderText.innerHTML = 'результаты';
			}
		}, 20);

})()
