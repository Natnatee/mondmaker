export default function Footer() {
  const current_year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {current_year} <span className="brand-name">MondMaker</span> — Smart IoT &
          Web Solutions
        </p>
      </div>
    </footer>
  );
}
