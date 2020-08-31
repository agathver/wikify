module.exports = {
    slug: function (title) {
        return encodeURIComponent(title.replace(/\s+/, '_'));
    },
    guessFromSlug: function (slug) {
        var position = slug.lastIndexOf('/') + 1 || 0;
        var title = decodeURIComponent(slug.substring(position));
        title = title.replace(/_+/, ' ');
        title = title.charAt(0).toUpperCase() + title.substring(1);
        return title;
    }
}
