export default function SubHeader({children}) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">

      <div className="container mx-auto max-w-screen-xl py-2">
        <div className="flex justify-between mx-4">
          {children}
        </div>
      </div>
    </header>
  );
}