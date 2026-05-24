import { Suspense } from "react";
import { ThankYouContent } from "./ThankYouContent";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-brand-muted">جاري التحميل...</p></div>}>
      <ThankYouContent />
    </Suspense>
  );
}
