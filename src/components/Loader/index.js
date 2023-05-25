import ReactLoading from "react-loading";

export default function Loader({ name }) {
  return (
    <div className="loading">
      {name}

      <ReactLoading type="spin" color="#0008080" height={400} width={150} />
    </div>
  );
}
