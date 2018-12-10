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

export function createSize (T, options = {}) {
  const {x, y} = options;
  return new T.Point(x, y)
}

export function createIcon (T, options = {}) {
  const {url, size, anchor} = options;
  return new T.Icon({
      iconUrl:url,
      iconSize:(size && createSize(T,size)) || createPoint(T,{x:25,y:41}),
      iconAnchor:(anchor && createSize(T,anchor)) || createPoint(T,{x:12,y:41})
  })
}

export function createLabel (T, options = {}) {
  const {content, opts} = options
  return new T.Label(content, {
    offset: opts.offset && createSize(T, opts.offset),
    position: opts.position && createLngLat(T, opts.position),
    enableMassClear: opts.enableMassClear
  })
}
