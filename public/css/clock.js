(function() {
    var clockFace = document.getElementById('cpl-widget-clock');
    
    setInterval(function() {
        console.log("Called");
        var now = new Date();
        clockFace.innerHTML = now.getHours() + ':' + now.getMinutes()+':' + now.getSeconds();
    }, 1000);
})();