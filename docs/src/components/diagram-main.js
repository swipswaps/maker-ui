/** @jsx jsx */
import { jsx } from "theme-ui"

export default ({ type }) => {
  function set(base, name) {
    return type == name ? base.concat(" active") : base
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 449 552"
      sx={{
        ".dark": { fill: "#d3d3d3" },
        ".darkest": { fill: "#c1c1c1" },
        ".active": { fill: "#f94bf1" },
        ".light": { fill: "#e6e6e6" },
      }}>
      <g>
        <path className={set("light", "content-wrapper")} d="M0 0h449v552H0z" />
        <path className={set("dark", "footer")} d="M0 425h449v126H0z" />
        <path
          className={set("darkest", "footer-widgets")}
          d="M38 452h376v69H38z"
        />
        <path className={set("dark", "sidebar")} d="M38 103h92.61v291H38z" />
        <path className={set("dark", "main")} d="M151.91 103H414v291H151.91z" />
        <path className={set("darkest", "topbar")} d="M0 0h449v18H0z" />
        <path className={set("dark", "header")} d="M0 18h449v54H0z" />
        <path className={set("darkest", "logo")} d="M38 30h93.54v25H38z" />
        <path
          className={set("darkest", "nav-menu")}
          d="M163.95 30H364v25H163.95z"
        />
        <path
          className={set("darkest", "header-widgets")}
          d="M374.18 30H414v25h-39.82z"
        />
      </g>
    </svg>
  )
}
