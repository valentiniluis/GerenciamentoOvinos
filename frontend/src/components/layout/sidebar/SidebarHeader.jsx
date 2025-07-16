import UserInitialSpan from "./UserInitialSpan";

const SidebarHeader = ({ user }) => {
  const displayedName = user.split(' ')[0];
  const initialLetter = user[0];

  return (
    <div className="row d-flex justify-content-center m-0 gap-3 py-3 border-bottom">
      <UserInitialSpan>{initialLetter}</UserInitialSpan>
      <p className="text-center">{displayedName}</p>
    </div>
  );
};

export default SidebarHeader;
