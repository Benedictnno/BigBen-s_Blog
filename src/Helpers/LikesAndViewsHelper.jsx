import { updateLike, updateViews } from "./UpdateDoc";

export function liked(id, userLike, setUserLike, IfLiked, { type }) {
  
  if (!IfLiked) {
    if (type === "inc") {
      setUserLike((prev) => prev - 1);
      console.log(userLike, "increased");
      updateLike(id, {
        like: userLike,
      });
    }
  }
  if (IfLiked) {
    if (type === "dec") {
      if (userLike >= 0) {
        setUserLike((prev) => prev + 1);
        console.log(userLike, "reduced");
        updateLike(id, {
          like: userLike,
        });
      }
    }
  }
}

export function Viewed(id, ifViewed, setIfViewed, userView, setUserView) {
  if (!ifViewed) {
    console.log(ifViewed);
    setUserView((prev) => prev + 1);

    updateViews(id, {
      views: userView,
    });

    setIfViewed(true);
    console.log(ifViewed);
  }
  console.log(userView);
}
