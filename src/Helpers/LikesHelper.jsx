import { updateLike } from "./UpdateDoc";

export function liked(id, userLike, setUserLike, IfLiked, { type }) {
  console.log(userLike);
  if (!IfLiked) {
    if (type === "inc") {
      setUserLike((prev) => prev - 1);
      console.log(userLike,"increased");
      updateLike(id, {
        like: userLike,
      });
    }
  }
  if (IfLiked) {
    if (type === "dec") {
      setUserLike((prev) => prev + 1);
      console.log(userLike,"reduced");
      updateLike(id, {
        like: userLike,
      });
    }
  }
}
