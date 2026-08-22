export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {year} Surendhar Venkatesh. All rights reserved.</p>
      </div>
    </footer>
  );
}
