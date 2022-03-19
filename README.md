# hemingwaylee.github.io

# TODO:
* fix scroll position issue
```
jQuery(document).ready(function() {
    setTimeout(updateScrollSpy, 1000);
});
function updateScrollSpy() {
    jQuery('[data-spy="scroll"]').each(function () {
      var $spy = jQuery(this).scrollspy('refresh')
    });
}
```
