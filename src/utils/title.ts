function makeTitleCase(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}

export function titleFromSlug(slug: string) {
    const position = slug.lastIndexOf('/') + 1 || 0;
    return makeTitleCase(decodeURIComponent(slug.substring(position))
        .replace(/_+/, ' '));
}

export function slugify(title: string) {
    return encodeURIComponent(title.replace(/\s+/, '_'));
}
