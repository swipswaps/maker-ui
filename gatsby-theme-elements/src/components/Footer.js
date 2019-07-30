/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const Footer = ({ backgroundColor, border, maxWidth, ...props }) => (
  <footer
    sx={{
      bg: backgroundColor || "bg_footer",
      borderTop: border || "footer",
    }}>
    <div
      {...props}
      sx={{
        m: "0 auto",
        p: 3,
        maxWidth: maxWidth || "max_footer",
      }}
    />
  </footer>
)

Footer.propTypes = {
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node.isRequired,
}

export default Footer
