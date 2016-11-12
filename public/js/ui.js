(function (window, document) {

        sidebar     = document.getElementById('sidebar'),
        sidebarLink = document.getElementById('sidebarLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    sidebarLink.onclick = function (e) {
        var active = 'expanded';

        e.preventDefault();
        toggleClass(sidebar, active);
    };

}(this, this.document));
