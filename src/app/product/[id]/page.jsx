import cakesData from "../../../data/cakes.json";
import ProductClient from "./ProductClient";

export async function generateStaticParams() {
  return cakesData.map((cake) => ({
    id: cake.id,
  }));
}

export default function ProductPage({ params }) {
  const { id } = params;
  const cake = cakesData.find((c) => c.id === id);

  if (!cake) {
    return (
      <div className="container" style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Cake not found</h2>
        <p>We couldn't find the cake you're looking for.</p>
      </div>
    );
  }

  return <ProductClient cake={cake} />;
}
