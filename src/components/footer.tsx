export default function Footer() {
  const current_year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand-info">
          <p className="footer-brand">MondMaker</p>
          <p className="footer-tagline">Smart IoT & Web Solutions</p>
        </div>

        <div className="footer-contact">
          <a href="tel:0973355322" className="contact-item phone">
            <span className="icon">📞</span> 097-335-5322
          </a>
          <a
            href="https://line.me/ti/p/~0973355322"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item line"
          >
            <span className="icon">💬</span> Line: 0973355322
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {current_year} MondMaker. All rights reserved.</p>
      </div>
    </footer>
  );
}
