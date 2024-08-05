import { IoMdArrowForward } from "react-icons/io";
import "./footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <main className="main-footer-container">
        <div className="footer_inner">
          <div className="c-footer">
            <div className="layout">
              <main className="layout_item w-50">
                <div className="newsletter">
                  <h3 className="newsletter_title">
                    Manage Your Tasks With TaskManager.
                  </h3>
                  <form className="form-footer" action="">
                    <input type="text" placeholder="Email Address" />
                    <button type="button">
                      <IoMdArrowForward />
                    </button>
                  </form>
                </div>
              </main>

              <main className="layout_item w-25">
                <nav className="c-nav-tool">
                  <h4 className="c-nav-tool_title">More On TaskManager</h4>
                  <ul className="c-nav-tool_list">
                    <li>
                      <Link className="c-link" to="/about">
                        About Us
                      </Link>
                    </li>
                  </ul>
                </nav>
              </main>
              <main className="layout_item w-25">
                <nav className="c-nav-tool">
                  <h4 className="c-nav-tool_title">TaskManager Management</h4>
                  <ul className="c-nav-tool_list">
                    <li>
                      <Link className="c-link" to="/dashboard/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="c-link" to="/dashboard/account">
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link className="c-link" to="/dashboard/account">
                        Completed Tasks
                      </Link>
                    </li>
                  </ul>
                </nav>
              </main>
            </div>
          </div>
        </div>
        <div className="footer_copyright">
          <p>&copy; 2024 TaskManager</p>
        </div>
      </main>
    </footer>
  );
};
