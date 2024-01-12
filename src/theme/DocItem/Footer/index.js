import React from 'react';
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import Footer from '@theme-original/DocItem/Footer';
import { useLocation } from "@docusaurus/router";
import styles from "./index.module.css";
import Translate from "@docusaurus/Translate";

const contributorsData = require("@site/static/contributors.json");

export default function FooterWrapper(props) {
  let { pathname } = useLocation();
  pathname = pathname.replace("/zh", "");
  let filename = pathname + ".md";
  filename = filename.replace("/", "")
  let filename_readme = pathname + "/README.md";
  filename_readme = filename_readme.replace("/", "")

  const contributorsIndex = contributorsData[filename] || contributorsData[filename_readme];
  return (
    <>
      {contributorsIndex && (
        <h3
          className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}
        >
          <Translate id="docs.contributors" />
        </h3>
      )}
      <ul className={styles.dedicateUl}>
        {contributorsIndex &&
          contributorsIndex.map((item, key) => {
            if (item.name !== "web-flow" && item.name !== "xzuoqi") {
              return (
                <li key={key}>
                  <a href={item.html_url} target="_black">
                    <img
                      src={item.avatar_url}
                      alt={item.name}
                      title={item.name}
                    />
                  </a>
                </li>
              );
            }
          })}
      </ul>
      <Footer {...props} />
    </>
  );
}
