import LogoImg from "../assets/img/logo.png";

function LogoDark({ size = 50 }) {
  return <img src={LogoImg} alt="Logo" style={{ height: `${size}px`, width: "auto" }} className="object-contain select-none" />;
}

export default LogoDark;
