import { DisplayText, Frame, TopBar } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import { connect } from "react-redux";
import { mapToState } from "../Actions/Maps";

const Topbar = (props) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    []
  );

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const logo = {
    width: 40,
    topBarSource: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTseqKFZuapJ6OA9qBmbjiVumIA0sw_PHXzivK9EjE&s`,
    accessibilityLabel: "Jaded Pixel",
  };
  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{ content: "Back to Shopify", icon: ArrowLeftMinor }],
        },
        {
          items: [{ content: "Community forums" }],
        },
      ]}
      name={props.user}
      // detail="Jaded Pixel"
      initials={props.user[0]}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );
  console.log(props);

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={<span>Options</span>}
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [
            { content: "Pull Request" },
            { content: "Issues" },
            { content: "MarketPlace" },
            { content: "Explore" },
          ],
        },
      ]}
    />
  );
  const allL = <DisplayText>gfgdghfghdfg</DisplayText>;
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      // searchResults={searchResultsMarkup}
      // onSearchResultsDismiss={handleSearchResultsDismiss}
      // onNavigationToggle={handleNavigationToggle}
      alllinks={allL}
    />
  );
  return (
    <div style={{ height: "50px" }}>
      <Frame topBar={topBarMarkup} logo={logo} />
    </div>
  );
};

export default connect(mapToState)(Topbar);
