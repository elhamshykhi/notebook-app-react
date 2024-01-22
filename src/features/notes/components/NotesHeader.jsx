import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import Button from "../../../ui/Button";
import { useNavigate } from "react-router-dom";

function NotesHeader({ heading, children }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-x-2 mb-2">
      <Button handleClick={() => navigate(-1)}>
        <HiOutlineArrowUturnLeft className="svg text-turquoise" />
      </Button>

      <h2 className="capitalize font-bold text-turquoise text-sm xs:text-base lg:text-lg">
        {heading}
      </h2>

      {!children ? <div className="w-7 h-7"></div> : children}
    </div>
  );
}

export default NotesHeader;
