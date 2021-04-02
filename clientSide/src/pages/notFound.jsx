import imageNotFound from "../images/1.svg";
const NotFound = () => {
  return (
    <div style={{ margin: "3%", width: "100%" }}>
      <img style={{ width: "100%" }} src={imageNotFound} alt="not found" />
    </div>
  );
};

export default NotFound;
