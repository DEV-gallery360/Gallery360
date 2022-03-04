var deferredPrompt;

if (!window.Promise){
	window.Promise = Promise;
}

if ("serviceWorker" in navigator){
	navigator.serviceWorker
		.register("/PWA/sw.js?ver=1.4")
		.then(function(){
			console.log("Service Worker resisted!");
		})
		.catch(function(err){
			console.log(err);
		});
}

window.addEventListener("befoerinstallprompt", function(event){
	console.log("beforeinstallprompt fires");
	event.preventDefault();
	deferredprompt = event;
	return false;
});


