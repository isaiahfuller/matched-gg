import { Group, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import classes from "./Sidebar.module.css";

export default function Sidebar({
  isLoggedIn,
  h,
}: {
  isLoggedIn: boolean;
  h: number;
}) {
  const [active, setActive] = useState("Billing");
  const data = [
    { link: "", label: "Recommendations" },
    { link: "", label: "Previously Recommended" },
    { link: "", label: "Sync your Libraries" },
  ];
  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
      <FontAwesomeIcon icon={faChevronRight} />
    </a>
  ));
  return (
    <nav className={classes.navbar} style={{ height: h }}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="center">
          <img src={logo} />
          <Text fw={500} size="xl">
            matched.gg
          </Text>
        </Group>
        <div className={classes.navlinks}>{links}</div>
      </div>

      <div className={classes.footer}>
        {isLoggedIn ? (
          <>
            <a
              href="#"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <span>Change account</span>
            </a>

            <a
              href="#"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <span>Logout</span>
            </a>
          </>
        ) : (
          <a href="/steam/auth" className={classes.link}>
            <span>Login</span>
          </a>
        )}
      </div>
    </nav>
  );
}
