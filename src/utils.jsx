export function urlArr(url) {
  // let link = url.toString().join();
  let link = url.split(" ");
  let joint = link.join("-");
  return joint;
}
