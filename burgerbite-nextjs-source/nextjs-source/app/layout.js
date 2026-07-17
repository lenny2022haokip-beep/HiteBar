import "./globals.css";

export const metadata = {
  title: "BurgerBite — Order Direct & Save 10%",
  description: "Handmade burgers, rolls & shawarma — straight from our grill to your door.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
