const SinglePageComponent = (
  subtitle,
  category,
  author,
  paragraphs,
  comments,
  title,
  imageUrl
) => {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
      <img
        src={imageUrl}
        alt={author}
      />
    </div>
  );
};

export default SinglePageComponent;
