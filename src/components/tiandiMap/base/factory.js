export function createLngLat (T, options = {}) {
  const {lng, lat} = options;
  return new T.LngLat(lng, lat);
}

export function createPoint (T, options = {}) {
    const {x, y} = options;
    return new T.Point(x, y);
}

export function createLngLatBounds (T, options = {}) {
  const {sw, ne} = options;
  return new T.LngLatBounds(createLngLat(T, sw), createLngLat(T, ne));
}

// export function createPixel (T, options = {}) {
//   const {x, y} = options
//   return new T.Pixel(x, y)
// }
//


// export function createSize (T, options = {}) {
//   const {width, height} = options
//   return new T.Size(width, height)
// }

// export function createIcon (T, options = {}) {
//   const {url, size, opts = {}} = options
//   return new T.Icon(url, createSize(T, size), {
//     anchor: opts.anchor && createSize(T, opts.anchor),
//     imageSize: opts.imageSize && createSize(T, opts.imageSize),
//     imageOffset: opts.imageOffset && createSize(T, opts.imageOffset),
//     infoWindowAnchor: opts.infoWindowAnchor && createSize(T, opts.infoWindowAnchor),
//     printImageUrl: opts.printImageUrl
//   })
// }

export function createLabel (T, options = {}) {
  const {content, opts} = options
  return new T.Label(content, {
    offset: opts.offset && createSize(T, opts.offset),
    position: opts.position && createLngLat(T, opts.position),
    enableMassClear: opts.enableMassClear
  })
}
