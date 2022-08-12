import { UnorderedList } from '../../styles';

export const SidebarItem = () => {
  return (
    <UnorderedList className="">
      <a href="#">
        <i className="bx bx-log-out icon" />
        <span className="text nav-text">Logout</span>
      </a>
    </UnorderedList>
  );
};
