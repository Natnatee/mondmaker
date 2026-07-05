export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {year} <span className="brand-name">MondMaker</span> — Smart IoT &
          Web Solutions
        </p>
      </div>
    </footer>
  );
}
