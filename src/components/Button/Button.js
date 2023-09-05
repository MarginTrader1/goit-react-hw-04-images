import { LoadMore } from "./Button.styled";

export const LoadMoreButton = ({ loadMore }) => {
  return (
    <>
      <LoadMore type="submit" onClick={loadMore}>
        <span>LoadMore</span>
      </LoadMore>
    </>
  );
};
