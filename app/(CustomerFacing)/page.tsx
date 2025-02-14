import Cards from "./_components/Cards";
import Hero from "./_components/Hero";
import Items from "./_components/Items";
import Shein from "./_components/Shein";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main className="bg-seventy min-h-screen">
      <div>
        <Hero />
        <Cards />
        {/* <Shein /> */}

        <Items home={true} category="Top Picks" />
        <Items home={true} category="Accessories" />
        <Items home={true} category="Clothes" />
        <Items home={true} category="Shoes" />
        <Items home={true} category="Tops" />
        <Items home={true} category="Cosomos" />
        <Items home={true} category="Bags" />
        <Items home={true} category="Othes" />
      </div>
      <Footer />
    </main>
  );
}
