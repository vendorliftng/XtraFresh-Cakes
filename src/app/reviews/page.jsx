import ReviewForm from '../components/ReviewForm';

export const metadata = {
  title: "Leave a Review | Xtra Fresh Cakes",
  description: "Tell us what you love or what we can improve.",
};

export default function ReviewsPage() {
  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--color-primary)', margin: '0 0 1rem 0' }}>Your Word Matters</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'var(--color-text-muted)', fontWeight: 600, maxWidth: '600px', margin: '0 auto' }}>
            We want to keep getting better for you. Kindly drop your honest review for our bakery. What do you absolutely love about us? What would you like to see change?
          </p>
        </div>
        <ReviewForm />
      </div>
    </main>
  );
}
